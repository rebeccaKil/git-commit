// ======================================================================
// 파일 2: api/commit.js (Vercel 환경 변수 설정 로직 추가)
// ======================================================================
// 이 파일은 Vercel의 Serverless Function으로 동작합니다.
// Node.js 환경에서 실행됩니다.

// GitHub API 요청을 위한 헬퍼 함수
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

// Vercel 배포 트리거 함수
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

// Vercel 프로젝트 생성 함수
async function createVercelProject(vercelToken, projectName, owner, repo, envVarsString) {
    const url = 'https://api.vercel.com/v9/projects';
    const headers = { 'Authorization': `Bearer ${vercelToken}`, 'Content-Type': 'application/json' };
    
    // ===== 변경점: 환경 변수 문자열을 Vercel API 형식으로 파싱 =====
    const environmentVariables = envVarsString.split('\n')
        .map(line => line.trim())
        .filter(line => line && line.includes('='))
        .map(line => {
            const [key, ...valueParts] = line.split('=');
            return { key: key.trim(), value: valueParts.join('=').trim() };
        });

    const body = JSON.stringify({
        name: projectName,
        gitRepository: { type: 'github', repo: `${owner}/${repo}` },
        environmentVariables: environmentVariables.length > 0 ? environmentVariables : undefined
    });

    const response = await fetch(url, { method: 'POST', headers, body });
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Vercel API Error (Project Creation):', { status: response.status, data: errorData });
        throw new Error(`Vercel 프로젝트 생성에 실패했습니다: ${errorData.error?.message || response.statusText}`);
    }
    return await response.json();
}


// 대상 브랜치 결정
async function getTargetBranch(owner, repo, token, branchName) {
    if (branchName) return branchName;
    const repoInfo = await githubApiRequest(`/repos/${owner}/${repo}`, token);
    return repoInfo.default_branch;
}

// Vercel 핸들러 함수
export default async function handler(request, response) {
    const githubToken = process.env.GITHUB_TOKEN;
    if (!githubToken) {
        return response.status(500).json({ message: '서버에 GitHub 토큰이 설정되지 않았습니다.' });
    }

    try {
        // GET 요청 처리
        if (request.method === 'GET') {
            const { owner, repo, branch, path } = request.query;
            const targetBranch = await getTargetBranch(owner, repo, githubToken, branch);
            if (path) {
                const fileData = await githubApiRequest(`/repos/${owner}/${repo}/contents/${path}?ref=${targetBranch}`, githubToken);
                const content = Buffer.from(fileData.content, 'base64').toString('utf8');
                return response.status(200).json({ content: content, sha: fileData.sha });
            } else {
                const refData = await githubApiRequest(`/repos/${owner}/${repo}/git/ref/heads/${targetBranch}`, githubToken);
                const treeSha = (await githubApiRequest(`/repos/${owner}/${repo}/git/commits/${refData.object.sha}`, githubToken)).tree.sha;
                const treeData = await githubApiRequest(`/repos/${owner}/${repo}/git/trees/${treeSha}?recursive=1`, githubToken);
                return response.status(200).json(treeData);
            }
        }

        // POST 요청 처리
        if (request.method === 'POST') {
            const { action, owner, repo, branch, commitMessage, files, path, editedContent, sha, vercel_token, vercel_project_id, new_project_name, environment_variables } = request.body;

            // Vercel 프로젝트 생성 요청 처리
            if (action === 'create_vercel_project') {
                const newProject = await createVercelProject(vercel_token, new_project_name, owner, repo, environment_variables);
                return response.status(200).json({ projectId: newProject.id, projectName: newProject.name });
            }

            // GitHub 커밋 로직
            const targetBranch = await getTargetBranch(owner, repo, githubToken, branch);
            let commitResult;

            if (editedContent !== undefined) { // 파일 수정
                const contentBase64 = Buffer.from(editedContent).toString('base64');
                const result = await githubApiRequest(`/repos/${owner}/${repo}/contents/${path}`, githubToken, {
                    method: 'PUT',
                    body: JSON.stringify({ message: commitMessage, content: contentBase64, sha: sha, branch: targetBranch })
                });
                commitResult = { commitUrl: result.commit.html_url };
            } else if (files) { // 새 파일 업로드
                const refData = await githubApiRequest(`/repos/${owner}/${repo}/git/refs/heads/${targetBranch}`, githubToken);
                const latestCommitSha = refData.object.sha;
                const baseTreeSha = (await githubApiRequest(`/repos/${owner}/${repo}/git/commits/${latestCommitSha}`, githubToken)).tree.sha;
                const blobPromises = files.map(file => 
                    githubApiRequest(`/repos/${owner}/${repo}/git/blobs`, githubToken, {
                        method: 'POST', body: JSON.stringify({ content: file.content, encoding: 'base64' })
                    }).then(blobData => ({ path: path ? `${path}/${file.name}` : file.name, mode: '100644', type: 'blob', sha: blobData.sha }))
                );
                const newTreeItems = await Promise.all(blobPromises);
                const newTreeData = await githubApiRequest(`/repos/${owner}/${repo}/git/trees`, githubToken, {
                    method: 'POST', body: JSON.stringify({ base_tree: baseTreeSha, tree: newTreeItems })
                });
                const newCommitData = await githubApiRequest(`/repos/${owner}/${repo}/git/commits`, githubToken, {
                    method: 'POST', body: JSON.stringify({ message: commitMessage, tree: newTreeData.sha, parents: [latestCommitSha] })
                });
                await githubApiRequest(`/repos/${owner}/${repo}/git/refs/heads/${targetBranch}`, githubToken, {
                    method: 'PATCH', body: JSON.stringify({ sha: newCommitData.sha })
                });
                commitResult = { commitUrl: newCommitData.html_url };
            }

            // Vercel 배포 트리거
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
