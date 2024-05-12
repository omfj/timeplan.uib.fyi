import { getCourse, parseCourse } from '$lib/services/get-course';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { validateSemyear } from '$lib/date';

export const load: PageServerLoad = async ({ params }) => {
	const { code, semyear } = params;

	if (!validateSemyear(semyear)) {
		error(404, 'Ugyldig semesterår.');
	}

	const courseCsv = await getCourse(code, semyear, 'no');

	if (courseCsv.length === 0) {
		error(404, 'Finner ikke emnet.');
	}

	const course = await parseCourse(courseCsv);

	return {
		course
	};
};
