import { r as redirect, f as fail } from '../../chunks/index.js';
const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const code = formData.get('code');
		if (code) {
			throw redirect(301, `/emne/${code.toString().toUpperCase()}`);
		}
		return fail(400, {
			error: 'Ingen emnekode gitt.'
		});
	}
};
export { actions };
