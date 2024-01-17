import { sqliteTable, text, blob, integer, index } from 'drizzle-orm/sqlite-core';

export const courses = sqliteTable(
	'course',
	{
		id: text('id').notNull().primaryKey(),
		name: text('name').notNull(),
		ownerId: text('owner_id').notNull(),
		yearFrom: integer('year_from'),
		yearTo: integer('year_to'),
		metadata: blob('metadata', { mode: 'json' })
	},
	(table) => ({
		nameIdx: index('name_idx').on(table.name)
	})
);

export type Course = (typeof courses)['$inferSelect'];
export type CourseInsert = (typeof courses)['$inferInsert'];
