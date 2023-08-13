import { getCourse } from '$lib/services/get-course';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const { code } = params;

	const course = await getCourse(code, '23h', 'no');

	if (course.length === 0) {
		throw error(404, 'Finner ikke emnet.');
	}

	return {
		course
	};
}) satisfies PageServerLoad;
