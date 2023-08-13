import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { createSession, createUser } from '$lib/db/queries';
import { DEFAULT_SESSION_LENGTH } from '$lib/constants';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { registerSchema } from '$lib/validators/register';

export const load = (async ({ locals }) => {
	if (locals.user) {
		throw redirect(304, '/');
	}

	const form = await superValidate(registerSchema);

	return {
		form
	};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, cookies }) => {
		const form = await superValidate(request, registerSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		const { username, email, password } = form.data;

		const { userId, error } = await createUser(email, username, password);

		if (error) {
			setError(form, 'username', error);
			setError(form, 'email', error);
			return fail(400, {
				form
			});
		}

		const sessionId = await createSession(userId, new Date(Date.now() + DEFAULT_SESSION_LENGTH));

		console.log('SESSION ID', sessionId);

		cookies.set('session', sessionId);

		return {
			form
		};
	}
} satisfies Actions;
