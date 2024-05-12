import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { semyearFromDate } from '$lib/date';

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();

		const code = formData.get('code');

		if (code) {
			redirect(301, `/emne/${semyearFromDate(new Date())}/${code.toString().toUpperCase()}`);
		}

		return fail(400, {
			error: 'Ingen emnekode gitt.'
		});
	}
};
