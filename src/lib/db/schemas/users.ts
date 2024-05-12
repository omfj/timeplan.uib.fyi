import { sqliteTable, text, primaryKey, uniqueIndex } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';
import { accounts, sessions } from '.';

export const users = sqliteTable('user', {
	id: text('id').notNull().primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull().unique()
});

export const usersRelations = relations(users, ({ many }) => ({
	sessions: many(sessions),
	accounts: many(accounts)
}));

export type User = (typeof users)['$inferSelect'];
export type UserInsert = (typeof users)['$inferInsert'];
