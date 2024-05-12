import { dev } from '$app/environment';
import { getProvider } from '$lib/auth/provider';
import type { RequestHandler } from './$types';
import { generateState } from 'arctic';
import { serializeCookie } from 'oslo/cookie';

export const GET: RequestHandler = async ({ params }) => {
	const provider = getProvider(params.provider);

	if (!provider) {
		return new Response(null, {
			status: 404
		});
	}

	const state = generateState();
	const url = await provider.client.createAuthorizationURL(state);

	return new Response(null, {
		status: 302,
		headers: {
			Location: url.toString(),
			'Set-Cookie': serializeCookie('oauth_state', state, {
				httpOnly: true,
				secure: dev,
				maxAge: 60 * 10,
				path: '/'
			})
		}
	});
};
