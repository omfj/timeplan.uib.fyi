import { getCourse } from '$lib/services/get-course';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const { code } = params;

	const course = await getCourse(code, '23h', 'no');

	return {
		course
	};
}) satisfies PageServerLoad;
