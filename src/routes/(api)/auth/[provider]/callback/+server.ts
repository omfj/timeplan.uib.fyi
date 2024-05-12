import { lucia } from '$lib/auth/lucia';
import { db } from '$lib/db/drizzle';
import { users } from '$lib/db/schemas';
import { OAuth2RequestError } from 'arctic';
import { and, eq } from 'drizzle-orm';
import type { RequestHandler } from './$types';
import { nanoid } from 'nanoid';
import { accounts } from '$lib/db/schemas/accounts';
import { getProivderUser, getProvider } from '$lib/auth/provider';

export const GET: RequestHandler = async ({ cookies, url, params }) => {
	const provider = getProvider(params.provider);
	if (!provider) {
		console.log('Provider does not exist:', params.provider);

		return new Response(`Provider with name, ${params.provider}, does not exist.`, {
			status: 404,
			statusText: 'Provider does not exist.'
		});
	}

	const stateCookie = cookies.get('oauth_state');
	const state = url.searchParams.get('state');
	const code = url.searchParams.get('code');

	if (!state || !stateCookie || !code || stateCookie !== state) {
		console.log(
			['Invalid state:', `state: ${state}`, `stateCookie: ${stateCookie}`, `code: ${code}`].join(
				'\n'
			)
		);

		return new Response(null, {
			status: 400
		});
	}

	try {
		const tokens = await provider.client.validateAuthorizationCode(code);

		const providerUser = await getProivderUser(provider.name, tokens.accessToken);

		const existingUser = await db
			.select()
			.from(users)
			.leftJoin(accounts, eq(users.id, accounts.userId))
			.where(
				and(
					eq(accounts.provider, params.provider),
					eq(accounts.providerAccountId, String(providerUser.id))
				)
			)
			.then((res) => res[0] ?? null);

		if (existingUser) {
			const session = await lucia.createSession(existingUser.user.id, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			return new Response(null, {
				status: 302,
				headers: {
					Location: '/',
					'Set-Cookie': sessionCookie.serialize()
				}
			});
		}

		const userId = nanoid(15);
		await db.transaction(async (tx) => {
			await tx.insert(users).values({
				id: userId,
				name: providerUser.name ?? providerUser.login,
				email: providerUser.email
			});

			await tx.insert(accounts).values({
				provider: provider.name,
				providerAccountId: String(providerUser.id),
				userId
			});
		});

		const session = await lucia.createSession(userId, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		return new Response(null, {
			status: 302,
			headers: {
				Location: '/',
				'Set-Cookie': sessionCookie.serialize()
			}
		});
	} catch (e) {
		console.error(e);
		if (e instanceof OAuth2RequestError) {
			// bad verification code, invalid credentials, etc
			return new Response(null, {
				status: 400
			});
		}
		return new Response(null, {
			status: 500
		});
	}
};
