// ======================================================================
// 파일 1: api/vercel.js (Vercel 연동 로직)
// ======================================================================
// 이 파일은 Vercel의 Serverless Function으로 동작합니다.

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
    // Vercel 토큰은 서버 환경 변수에서 안전하게 가져옵니다.
    const vercelToken = process.env.VERCEL_TOKEN;
    if (!vercelToken) {
        return response.status(500).json({ message: '서버에 Vercel 토큰이 설정되지 않았습니다.' });
    }

    try {
        if (request.method === 'POST') {
            const { action, owner, repo, branch, vercel_project_id, new_project_name, environment_variables } = request.body;

            // Vercel 프로젝트 생성 요청 처리
            if (action === 'create_vercel_project') {
                const newProject = await createVercelProject(vercelToken, new_project_name, owner, repo, environment_variables);
                return response.status(200).json({ projectId: newProject.id, projectName: newProject.name });
            }
            // Vercel 배포 요청 처리
            else if (action === 'trigger_deployment') {
                const deploymentData = await triggerVercelDeployment(vercelToken, vercel_project_id, owner, repo, branch);
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
