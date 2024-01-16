import { l as lucia } from '../../../../../chunks/lucia.js';
const GET = async ({ cookies }) => {
	const sessionId = cookies.get(lucia.sessionCookieName);
	if (sessionId) {
		await lucia.invalidateSession(sessionId);
	}
	const blankSession = lucia.createBlankSessionCookie();
	const headers = new Headers();
	headers.append('Location', '/');
	headers.append('Set-Cookie', blankSession.serialize());
	return new Response(null, {
		status: 302,
		headers
	});
};
export { GET };
