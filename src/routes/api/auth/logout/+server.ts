import { lucia } from '$lib/auth/lucia';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ cookies }) => {
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
