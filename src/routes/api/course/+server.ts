import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/db/drizzle';
import { like, or } from 'drizzle-orm';

export const GET: RequestHandler = async ({ url }) => {
	const searchTerm = url.searchParams.get('q');

	if (!searchTerm) {
		return json([]);
	}

	const courses = await db.query.courses.findMany({
		where: (course) => or(like(course.name, `%${searchTerm}%`), like(course.id, `%${searchTerm}%`)),
		limit: 5
	});

	return json(courses);
};
