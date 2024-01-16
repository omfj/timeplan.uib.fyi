import { r as redirect } from '../../../chunks/index.js';
const load = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(304, '/login');
	}
};
export { load };
