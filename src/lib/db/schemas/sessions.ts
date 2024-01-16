import { sqliteTable, text, integer, primaryKey } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';
import { users } from '.';

export const sessions = sqliteTable(
	'session',
	{
		id: text('id').notNull(),
		userId: text('user_id')
			.notNull()
			.references(() => users.id),
		expiresAt: integer('expires_at', {
			mode: 'timestamp'
		}).notNull()
	},
	(t) => ({
		pk: primaryKey({ columns: [t.id] })
	})
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
	user: one(users, {
		fields: [sessions.userId],
		references: [users.id]
	})
}));

export type Session = (typeof sessions)['$inferSelect'];
export type SessionInsert = (typeof sessions)['$inferInsert'];
