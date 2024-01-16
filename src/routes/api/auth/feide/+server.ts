import { dev } from '$app/environment';
import { feideAuth } from '$lib/auth/providers/feide';
import type { RequestHandler } from '@sveltejs/kit';
import { generateState } from 'arctic';
import { serializeCookie } from 'oslo/cookie';

export const GET: RequestHandler = async () => {
	const state = generateState();
	const url = await feideAuth.createAuthorizationURL(state, {
		scopes: ['email', 'openid', 'profile']
	});

	const headers = new Headers();
	headers.append('Location', url.toString());
	headers.append(
		'Set-Cookie',
		serializeCookie('oauth_state', state, {
			httpOnly: true,
			secure: dev,
			maxAge: 60 * 10,
			path: '/'
		})
	);

	return new Response(null, {
		status: 302,
		headers
	});
};
