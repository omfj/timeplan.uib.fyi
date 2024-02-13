import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { courses } from './courses';

export const GET: RequestHandler = async ({ url }) => {
	const searchTerm = url.searchParams.get('q');

	if (!searchTerm) {
		return json([]);
	}

	const filteredCourses = courses
		.filter((course) => {
			const search = searchTerm.toLowerCase();
			return course.id.toLowerCase().includes(search) || course.name.toLowerCase().includes(search);
		})
		.slice(0, 5);

	return json(filteredCourses);
};
