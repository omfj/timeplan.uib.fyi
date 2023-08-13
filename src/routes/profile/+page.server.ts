import { db } from '$lib/db/drizzle';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	if (!locals.user) {
		throw redirect(304, '/login');
	}

	const user = await db.query.users.findFirst({
		where: (users, { eq }) => eq(users.id, locals.user.id)
	});

	if (!user) {
		throw redirect(304, '/login');
	}

	return {
		user
	};
}) satisfies PageServerLoad;
