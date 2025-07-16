<!-- ====================================================================== -->
<!-- 파일 2: api/commit.js (브랜치 정보를 받아서 처리하도록 수정) -->
<!-- ====================================================================== -->
```javascript
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
        // 404 Not Found는 브랜치가 없거나 파일이 없을 때 발생할 수 있으므로, 조금 더 구체적인 에러 메시지를 전달합니다.
        if (response.status === 404) {
             throw new Error(`리소스를 찾을 수 없습니다 (404). 저장소 URL과 브랜치 이름이 올바른지 확인하세요.`);
        }
        throw new Error(`GitHub API Error: ${response.status} ${response.statusText}. ${errorData.message || ''}`);
    }
    return response.status === 204 ? null : response.json();
}

// ===== 변경점: 브랜치 정보를 처리하는 로직 추가 =====
// 대상 브랜치를 결정하는 헬퍼 함수
async function getTargetBranch(owner, repo, token, branchName) {
    if (branchName) {
        return branchName; // 사용자가 브랜치를 지정한 경우 해당 브랜치 사용
    }
    // 사용자가 브랜치를 지정하지 않은 경우, 저장소의 기본 브랜치를 조회
    const repoInfo = await githubApiRequest(`/repos/${owner}/${repo}`, token);
    return repoInfo.default_branch;
}


// Vercel이 이 함수를 API 엔드포인트로 만듭니다.
export default async function handler(request, response) {
    const token = process.env.GITHUB_TOKEN;

    if (!token) {
        return response.status(500).json({ message: 'GitHub token is not configured on the server.' });
    }

    try {
        // GET 요청: 저장소 파일 트리 구조를 가져옴
        if (request.method === 'GET') {
            const { owner, repo, branch } = request.query;
            const targetBranch = await getTargetBranch(owner, repo, token, branch);

            const refData = await githubApiRequest(`/repos/${owner}/${repo}/git/ref/heads/${targetBranch}`, token);
            const commitSha = refData.object.sha;
            const commitData = await githubApiRequest(`/repos/${owner}/${repo}/git/commits/${commitSha}`, token);
            const treeSha = commitData.tree.sha;
            const treeData = await githubApiRequest(`/repos/${owner}/${repo}/git/trees/${treeSha}?recursive=1`, token);
            
            return response.status(200).json(treeData);
        }

        // POST 요청: 파일을 커밋함
        if (request.method === 'POST') {
            const { owner, repo, branch, commitMessage, files, path } = request.body;
            const targetBranch = await getTargetBranch(owner, repo, token, branch);

            // 1. 대상 브랜치의 최신 커밋 정보 가져오기
            const refData = await githubApiRequest(`/repos/${owner}/${repo}/git/refs/heads/${targetBranch}`, token);
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
            await githubApiRequest(`/repos/${owner}/${repo}/git/refs/heads/${targetBranch}`, token, {
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
