import { lucia } from '$lib/auth/lucia';
import { db } from '$lib/db/drizzle';
import { users } from '$lib/db/schemas';
import { OAuth2RequestError } from 'arctic';
import { and, eq } from 'drizzle-orm';
import { generateId } from 'lucia';
import type { RequestHandler } from './$types';
import { feideAuth, getFeideUser } from '$lib/auth/providers/feide';
import { accounts } from '$lib/db/schemas/accounts';

export const GET: RequestHandler = async ({ cookies, url }) => {
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
		const tokens = await feideAuth.validateAuthorizationCode(code);

		const feideUser = await getFeideUser(tokens.accessToken);

		const existingUser = await db
			.select()
			.from(users)
			.leftJoin(accounts, eq(users.id, accounts.userId))
			.where(and(eq(accounts.provider, 'feide'), eq(accounts.providerAccountId, feideUser.id)))
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

		const userId = generateId(15);
		await db.transaction(async (tx) => {
			await tx.insert(users).values({
				id: userId,
				name: feideUser.name,
				email: feideUser.email
			});

			await tx.insert(accounts).values({
				provider: 'feide',
				providerAccountId: feideUser.id,
				userId,
				accessToken: tokens.accessToken,
				refreshToken: null,
				expiresAt: Math.floor(tokens.expiresAt),
				scope: tokens.scope,
				tokenType: tokens.tokenType,
				idToken: tokens.idToken
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
