import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/db/drizzle';
import { sql } from 'drizzle-orm';
import { courses } from '$lib/db/schemas';

export const GET: RequestHandler = async ({ url }) => {
	const searchTerm = url.searchParams.get('q');

	if (!searchTerm) {
		return json([]);
	}

	const filteredCourses = await db
		.select({
			id: courses.id,
			name: courses.name
		})
		.from(courses)
		.where(
			sql.join(
				[
					sql`lower(${courses.name}) like ${`${searchTerm.toLowerCase()}%`}`,
					sql`OR`,
					sql`lower(${courses.id}) like ${`${searchTerm.toLowerCase()}%`}`
				],
				sql` `
			)
		)
		.limit(5);

	return json(filteredCourses);
};
