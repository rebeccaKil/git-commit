// ======================================================================
// 파일 1: api/vercel.js (repoId 사용하도록 수정)
// ======================================================================
// 이 파일은 Vercel의 Serverless Function으로 동작합니다.

// GitHub API 요청을 위한 헬퍼 함수 (vercel.js 내부에 추가)
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

// Vercel 배포 트리거 함수 (repoId 사용하도록 수정)
async function triggerVercelDeployment(vercelToken, userGithubToken, projectId, owner, repo, branch) {
    // GitHub API를 호출하여 저장소의 숫자 ID(repoId)를 가져옵니다.
    const repoData = await githubApiRequest(`/repos/${owner}/${repo}`, userGithubToken);
    const repoId = repoData.id;

    const url = 'https://api.vercel.com/v13/deployments';
    const headers = { 'Authorization': `Bearer ${vercelToken}`, 'Content-Type': 'application/json' };
    const body = JSON.stringify({
        name: projectId,
        gitSource: {
            type: 'github',
            repoId: repoId, // repo 대신 repoId를 사용합니다.
            ref: branch
        }
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
async function createVercelProject(vercelToken, projectName, owner, repo, environmentVariables) {
    const url = 'https://api.vercel.com/v9/projects';
    const headers = { 'Authorization': `Bearer ${vercelToken}`, 'Content-Type': 'application/json' };
    
    const body = JSON.stringify({
        name: projectName,
        gitRepository: { type: 'github', repo: `${owner}/${repo}` },
        environmentVariables: environmentVariables && environmentVariables.length > 0 ? environmentVariables : undefined
    });

    const response = await fetch(url, { method: 'POST', headers, body });
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Vercel API Error (Project Creation):', { status: response.status, data: errorData });
        throw new Error(`Vercel 프로젝트 생성에 실패했습니다: ${errorData.error?.message || response.statusText}`);
    }
    return await response.json();
}

export default async function handler(request, response) {
    const vercelToken = process.env.VERCEL_TOKEN;
    if (!vercelToken) {
        return response.status(500).json({ message: '서버에 Vercel 토큰이 설정되지 않았습니다.' });
    }

    const userGithubToken = request.headers.authorization?.split(' ')[1];
    if (!userGithubToken) {
        return response.status(401).json({ message: 'GitHub 인증 토큰이 필요합니다.' });
    }

    try {
        if (request.method === 'POST') {
            const { action, owner, repo, branch, vercel_project_id, new_project_name, environment_variables } = request.body;

            if (action === 'create_vercel_project') {
                const newProject = await createVercelProject(vercelToken, new_project_name, owner, repo, environment_variables);
                return response.status(200).json({ projectId: newProject.id, projectName: newProject.name });
            }
            else if (action === 'trigger_deployment') {
                const deploymentData = await triggerVercelDeployment(vercelToken, userGithubToken, vercel_project_id, owner, repo, branch);
                return response.status(200).json({ deploymentUrl: `https://${deploymentData.url}` });
            }
        }

        response.setHeader('Allow', ['POST']);
        return response.status(405).end('Method Not Allowed');

    } catch (error) {
        console.error("--- Vercel API Handler Error ---", error);
        return response.status(500).json({ message: error.message || '서버에서 예기치 않은 오류가 발생했습니다.' });
    }
}
