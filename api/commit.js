// ======================================================================
// 파일 3: api/commit.js (사용자 토큰 기반으로 작동하도록 수정)
// ======================================================================
// (이 파일의 내용은 이전 답변의 api/commit.js와 거의 동일하지만, 
// GITHUB_TOKEN 대신 사용자 토큰을 헤더에서 받아 사용하도록 변경되었습니다.)

async function githubApiRequest(endpoint, token, options = {}) {
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

async function triggerVercelDeployment(vercelToken, projectId, owner, repo, branch) {
    const url = 'https://api.vercel.com/v13/deployments';
    const headers = { 'Authorization': `Bearer ${vercelToken}`, 'Content-Type': 'application/json' };
    const body = JSON.stringify({
        name: projectId,
        gitSource: { type: 'github', repo: `${owner}/${repo}`, ref: branch }
    });
    const response = await fetch(url, { method: 'POST', headers, body });
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Vercel API Error (Deployment):', { status: response.status, data: errorData });
        throw new Error(`Vercel 배포 시작에 실패했습니다: ${errorData.error?.message || response.statusText}`);
    }
    return await response.json();
}

async function createVercelProject(vercelToken, projectName, owner, repo) {
    const url = 'https://api.vercel.com/v9/projects';
    const headers = { 'Authorization': `Bearer ${vercelToken}`, 'Content-Type': 'application/json' };
    const body = JSON.stringify({
        name: projectName,
        gitRepository: { type: 'github', repo: `${owner}/${repo}` }
    });
    const response = await fetch(url, { method: 'POST', headers, body });
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Vercel API Error (Project Creation):', { status: response.status, data: errorData });
        throw new Error(`Vercel 프로젝트 생성에 실패했습니다: ${errorData.error?.message || response.statusText}`);
    }
    return await response.json();
}

async function getTargetBranch(owner, repo, token, branchName) {
    if (branchName) return branchName;
    const repoInfo = await githubApiRequest(`/repos/${owner}/${repo}`, token);
    return repoInfo.default_branch;
}

export default async function handler(request, response) {
    // ===== 변경점: 서버 토큰 대신 사용자 토큰을 요청 헤더에서 추출 =====
    const userGithubToken = request.headers.authorization?.split(' ')[1];
    if (!userGithubToken && request.method !== 'POST' && request.body.action !== 'create_vercel_project') {
        return response.status(401).json({ message: 'GitHub 인증 토큰이 필요합니다.' });
    }

    try {
        if (request.method === 'GET') {
            const { owner, repo, branch, path } = request.query;
            const targetBranch = await getTargetBranch(owner, repo, userGithubToken, branch);
            if (path) {
                const fileData = await githubApiRequest(`/repos/${owner}/${repo}/contents/${path}?ref=${targetBranch}`, userGithubToken);
                const content = Buffer.from(fileData.content, 'base64').toString('utf8');
                return response.status(200).json({ content: content, sha: fileData.sha });
            } else {
                const refData = await githubApiRequest(`/repos/${owner}/${repo}/git/ref/heads/${targetBranch}`, userGithubToken);
                const treeSha = (await githubApiRequest(`/repos/${owner}/${repo}/git/commits/${refData.object.sha}`, userGithubToken)).tree.sha;
                const treeData = await githubApiRequest(`/repos/${owner}/${repo}/git/trees/${treeSha}?recursive=1`, userGithubToken);
                return response.status(200).json(treeData);
            }
        }

        if (request.method === 'POST') {
            const { action, owner, repo, branch, commitMessage, files, path, editedContent, sha, vercel_token, vercel_project_id, new_project_name } = request.body;

            if (action === 'create_vercel_project') {
                const newProject = await createVercelProject(vercel_token, new_project_name, owner, repo);
                return response.status(200).json({ projectId: newProject.id, projectName: newProject.name });
            }

            const targetBranch = await getTargetBranch(owner, repo, userGithubToken, branch);
            let commitResult;

            if (editedContent !== undefined) {
                const contentBase64 = Buffer.from(editedContent).toString('base64');
                const result = await githubApiRequest(`/repos/${owner}/${repo}/contents/${path}`, userGithubToken, {
                    method: 'PUT',
                    body: JSON.stringify({ message: commitMessage, content: contentBase64, sha: sha, branch: targetBranch })
                });
                commitResult = { commitUrl: result.commit.html_url };
            } else if (files) {
                const refData = await githubApiRequest(`/repos/${owner}/${repo}/git/refs/heads/${targetBranch}`, userGithubToken);
                const latestCommitSha = refData.object.sha;
                const baseTreeSha = (await githubApiRequest(`/repos/${owner}/${repo}/git/commits/${latestCommitSha}`, userGithubToken)).tree.sha;
                const blobPromises = files.map(file => 
                    githubApiRequest(`/repos/${owner}/${repo}/git/blobs`, userGithubToken, {
                        method: 'POST', body: JSON.stringify({ content: file.content, encoding: 'base64' })
                    }).then(blobData => ({ path: path ? `${path}/${file.name}` : file.name, mode: '100644', type: 'blob', sha: blobData.sha }))
                );
                const newTreeItems = await Promise.all(blobPromises);
                const newTreeData = await githubApiRequest(`/repos/${owner}/${repo}/git/trees`, userGithubToken, {
                    method: 'POST', body: JSON.stringify({ base_tree: baseTreeSha, tree: newTreeItems })
                });
                const newCommitData = await githubApiRequest(`/repos/${owner}/${repo}/git/commits`, userGithubToken, {
                    method: 'POST', body: JSON.stringify({ message: commitMessage, tree: newTreeData.sha, parents: [latestCommitSha] })
                });
                await githubApiRequest(`/repos/${owner}/${repo}/git/refs/heads/${targetBranch}`, userGithubToken, {
                    method: 'PATCH', body: JSON.stringify({ sha: newCommitData.sha })
                });
                commitResult = { commitUrl: newCommitData.html_url };
            }

            if (vercel_token && vercel_project_id) {
                const deploymentData = await triggerVercelDeployment(vercel_token, vercel_project_id, owner, repo, targetBranch);
                commitResult.deploymentUrl = `https://${deploymentData.url}`;
            }

            return response.status(200).json(commitResult);
        }

        response.setHeader('Allow', ['GET', 'POST']);
        return response.status(405).end('Method Not Allowed');

    } catch (error) {
        console.error("--- API Handler Error ---", error);
        return response.status(500).json({ message: error.message || '서버에서 예기치 않은 오류가 발생했습니다.' });
    }
}
