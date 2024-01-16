import { getCourse } from '$lib/services/get-course';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getYearAndSemester } from '$lib/date';

export const load: PageServerLoad = async ({ params }) => {
	const { code } = params;

	const semesterYear = getYearAndSemester(new Date());
	const course = await getCourse(code, semesterYear, 'no');

	if (course.length === 0) {
		throw error(404, 'Finner ikke emnet.');
	}

	return {
		course
	};
};
