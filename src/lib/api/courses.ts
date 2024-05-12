import type { Course } from '$lib/db/schemas';
import { baseURL } from '$lib/utils';

export const fetchCourses = async (searchTerm: string, options?: RequestInit) => {
	const res = await fetch(`${baseURL}/course?q=${searchTerm}`, {
		...options,
		headers: {
			'Content-Type': 'application/json'
		}
	});
	return res.json() as Promise<
		Array<{
			id: Course['id'];
			name: Course['name'];
		}>
	>;
};
