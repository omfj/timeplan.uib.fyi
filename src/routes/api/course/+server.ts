import { courses } from './courses';
import { json } from '@sveltejs/kit';
import { search } from '$lib/courses/data';

export function GET({ url }) {
	const query = url.searchParams.get('q');
	const results = search(courses, query);

	return json(results);
}
