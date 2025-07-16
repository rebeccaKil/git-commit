// 이 파일은 Vercel의 Serverless Function으로 동작합니다.
// Node.js 환경에서 실행됩니다.

// GitHub API 요청을 위한 헬퍼 함수
async function githubApiRequest(endpoint, token, options = {}) {
    const url = `https://api.github.com${endpoint}`;
    const headers = {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        ...options.headers,
    };
    const response = await fetch(url, { ...options, headers });
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`GitHub API Error: ${response.status} ${response.statusText}. ${errorData.message || ''}`);
    }
    return response.status === 204 ? null : response.json();
}

// Vercel이 이 함수를 API 엔드포인트로 만듭니다.
export default async function handler(request, response) {
    // process.env.GITHUB_TOKEN는 Vercel에 설정할 환경 변수입니다.
    const token = process.env.GITHUB_TOKEN;

    if (!token) {
        return response.status(500).json({ message: 'GitHub token is not configured on the server.' });
    }

    try {
        // GET 요청: 저장소 파일 트리 구조를 가져옴
        if (request.method === 'GET') {
            const { owner, repo } = request.query;
            const repoInfo = await githubApiRequest(`/repos/${owner}/${repo}`, token);
            const defaultBranch = repoInfo.default_branch;
            const refData = await githubApiRequest(`/repos/${owner}/${repo}/git/ref/heads/${defaultBranch}`, token);
            const treeSha = refData.object.sha;
            const treeData = await githubApiRequest(`/repos/${owner}/${repo}/git/trees/${treeSha}?recursive=1`, token);

            return response.status(200).json(treeData);
        }

        // POST 요청: 파일을 커밋함
        if (request.method === 'POST') {
            const { owner, repo, commitMessage, files, path } = request.body;

            // 1. 기본 브랜치 및 최신 커밋 정보 가져오기
            const repoInfo = await githubApiRequest(`/repos/${owner}/${repo}`, token);
            const defaultBranch = repoInfo.default_branch;
            const refData = await githubApiRequest(`/repos/${owner}/${repo}/git/refs/heads/${defaultBranch}`, token);
            const latestCommitSha = refData.object.sha;
            const commitData = await githubApiRequest(`/repos/${owner}/${repo}/git/commits/${latestCommitSha}`, token);
            const baseTreeSha = commitData.tree.sha;

            // 2. 각 파일을 GitHub에 Blob으로 생성
            const blobPromises = files.map(file => 
                githubApiRequest(`/repos/${owner}/${repo}/git/blobs`, token, {
                    method: 'POST',
                    body: JSON.stringify({ content: file.content, encoding: 'base64' })
                }).then(blobData => ({
                    path: path ? `${path}/${file.name}` : file.name,
                    mode: '100644', type: 'blob', sha: blobData.sha
                }))
            );
            const newTreeItems = await Promise.all(blobPromises);

            // 3. 새 파일들로 새로운 Tree 생성
            const newTreeData = await githubApiRequest(`/repos/${owner}/${repo}/git/trees`, token, {
                method: 'POST',
                body: JSON.stringify({ base_tree: baseTreeSha, tree: newTreeItems })
            });

            // 4. 새로운 Tree로 새 커밋 생성
            const newCommitData = await githubApiRequest(`/repos/${owner}/${repo}/git/commits`, token, {
                method: 'POST',
                body: JSON.stringify({ message: commitMessage, tree: newTreeData.sha, parents: [latestCommitSha] })
            });

            // 5. 브랜치가 새 커밋을 가리키도록 업데이트
            await githubApiRequest(`/repos/${owner}/${repo}/git/refs/heads/${defaultBranch}`, token, {
                method: 'PATCH',
                body: JSON.stringify({ sha: newCommitData.sha })
            });

            return response.status(200).json({ commitUrl: newCommitData.html_url });
        }

        // 허용되지 않은 메소드
        response.setHeader('Allow', ['GET', 'POST']);
        return response.status(405).end('Method Not Allowed');

    } catch (error) {
        return response.status(500).json({ message: error.message });
    }
}
