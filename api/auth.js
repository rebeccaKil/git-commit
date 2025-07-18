// ======================================================================
// 파일 2: api/auth.js (GitHub 로그인 콜백 처리)
// ======================================================================
export default async function handler(request, response) {
    const { code } = request.body;

    const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
    const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

    if (!code) {
        return response.status(400).json({ message: 'Authorization code is missing.' });
    }

    try {
        const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                client_id: GITHUB_CLIENT_ID,
                client_secret: GITHUB_CLIENT_SECRET,
                code: code,
            }),
        });

        const tokenData = await tokenResponse.json();

        if (tokenData.error) {
            throw new Error(tokenData.error_description);
        }

        response.status(200).json({ token: tokenData.access_token });

    } catch (error) {
        console.error("--- Auth API Error ---", error);
        response.status(500).json({ message: error.message || 'Failed to authenticate with GitHub.' });
    }
}
