// import { db } from '../src/lib/db/drizzle';
// import { courses } from '../src/lib/db/schemas/courses';

// async function main() {
// 	for (const course of []) {
// 		const { id, name, ownerid, yearfrom_und, yearto_ex, ...metadata } = course;
// 		await db
// 			.insert(courses)
// 			.values({
// 				id,
// 				name,
// 				ownerId: ownerid,
// 				yearFrom: yearfrom_und,
// 				yearTo: yearto_ex,
// 				metadata: metadata
// 			})
// 			.onConflictDoNothing();

// 		console.log(`Inserted course ${id}`);
// 	}
// }

// main().catch((err) => {
// 	console.error(err);
// 	process.exit(1);
// });
