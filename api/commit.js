// ======================================================================
// 파일 2: api/commit.js (URL 구문 오류 최종 수정)
// ======================================================================
// 이 파일은 Vercel의 Serverless Function으로 동작합니다.
// Node.js 환경에서 실행됩니다.

// GitHub API 요청을 위한 헬퍼 함수
async function githubApiRequest(endpoint, token, options = {}) {
    // ===== 최종 수정: 올바른 URL 형식 적용 =====
    const url = 'https://api.github.com' + endpoint;
    const headers = {
        'Authorization': 'token ' + token,
        'Accept': 'application/vnd.github.v3+json',
        ...options.headers,
    };
    const response = await fetch(url, { ...options, headers });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('GitHub API Error Response:', { status: response.status, data: errorData });
        if (response.status === 404) {
             throw new Error('리소스를 찾을 수 없습니다 (404). 저장소나 브랜치 이름, 파일 경로를 확인하세요.');
        }
        const errorMessage = errorData.message || 'An unknown error from GitHub API.';
        throw new Error('GitHub API Error: ' + response.status + '. ' + errorMessage);
    }
    return response.status === 204 ? null : response.json();
}

// 대상 브랜치 결정
async function getTargetBranch(owner, repo, token, branchName) {
    if (branchName) return branchName;
    const repoInfo = await githubApiRequest(`/repos/${owner}/${repo}`, token);
    return repoInfo.default_branch;
}

// Vercel 핸들러 함수
export default async function handler(request, response) {
    const token = process.env.GITHUB_TOKEN;
    if (!token) {
        return response.status(500).json({ message: '서버에 GitHub 토큰이 설정되지 않았습니다.' });
    }

    try {
        // GET 요청 처리: 파일 트리 또는 파일 내용 가져오기
        if (request.method === 'GET') {
            const { owner, repo, branch, path } = request.query;
            const targetBranch = await getTargetBranch(owner, repo, token, branch);

            // 특정 파일의 내용을 요청하는 경우
            if (path) {
                const fileData = await githubApiRequest(`/repos/${owner}/${repo}/contents/${path}?ref=${targetBranch}`, token);
                const content = Buffer.from(fileData.content, 'base64').toString('utf8');
                return response.status(200).json({ content: content, sha: fileData.sha });
            } 
            // 파일 트리를 요청하는 경우
            else {
                const refData = await githubApiRequest(`/repos/${owner}/${repo}/git/ref/heads/${targetBranch}`, token);
                const treeSha = (await githubApiRequest(`/repos/${owner}/${repo}/git/commits/${refData.object.sha}`, token)).tree.sha;
                const treeData = await githubApiRequest(`/repos/${owner}/${repo}/git/trees/${treeSha}?recursive=1`, token);
                return response.status(200).json(treeData);
            }
        }

        // POST 요청 처리: 새 파일 업로드 또는 기존 파일 수정
        if (request.method === 'POST') {
            const { owner, repo, branch, commitMessage, files, path, editedContent, sha } = request.body;
            const targetBranch = await getTargetBranch(owner, repo, token, branch);

            // 기존 파일 수정 로직
            if (editedContent !== undefined) {
                const contentBase64 = Buffer.from(editedContent).toString('base64');
                const result = await githubApiRequest(`/repos/${owner}/${repo}/contents/${path}`, token, {
                    method: 'PUT',
                    body: JSON.stringify({
                        message: commitMessage,
                        content: contentBase64,
                        sha: sha,
                        branch: targetBranch
                    })
                });
                return response.status(200).json({ commitUrl: result.commit.html_url });
            }
            // 새 파일 업로드 로직
            else if (files) {
                const refData = await githubApiRequest(`/repos/${owner}/${repo}/git/refs/heads/${targetBranch}`, token);
                const latestCommitSha = refData.object.sha;
                const baseTreeSha = (await githubApiRequest(`/repos/${owner}/${repo}/git/commits/${latestCommitSha}`, token)).tree.sha;

                const blobPromises = files.map(file => 
                    githubApiRequest(`/repos/${owner}/${repo}/git/blobs`, token, {
                        method: 'POST', body: JSON.stringify({ content: file.content, encoding: 'base64' })
                    }).then(blobData => ({
                        path: path ? `${path}/${file.name}` : file.name,
                        mode: '100644', type: 'blob', sha: blobData.sha
                    }))
                );
                const newTreeItems = await Promise.all(blobPromises);

                const newTreeData = await githubApiRequest(`/repos/${owner}/${repo}/git/trees`, token, {
                    method: 'POST', body: JSON.stringify({ base_tree: baseTreeSha, tree: newTreeItems })
                });

                const newCommitData = await githubApiRequest(`/repos/${owner}/${repo}/git/commits`, token, {
                    method: 'POST', body: JSON.stringify({ message: commitMessage, tree: newTreeData.sha, parents: [latestCommitSha] })
                });

                await githubApiRequest(`/repos/${owner}/${repo}/git/refs/heads/${targetBranch}`, token, {
                    method: 'PATCH', body: JSON.stringify({ sha: newCommitData.sha })
                });

                return response.status(200).json({ commitUrl: newCommitData.html_url });
            }
        }

        response.setHeader('Allow', ['GET', 'POST']);
        return response.status(405).end('Method Not Allowed');

    } catch (error) {
        console.error("--- API Handler Error ---", error);
        return response.status(500).json({ message: error.message || '서버에서 예기치 않은 오류가 발생했습니다.' });
    }
}
