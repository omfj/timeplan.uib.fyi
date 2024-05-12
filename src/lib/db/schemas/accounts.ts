import { sqliteTable, integer, primaryKey, text } from 'drizzle-orm/sqlite-core';
import { users } from './users';
import { relations } from 'drizzle-orm';

export const accounts = sqliteTable(
	'account',
	{
		userId: text('user_id')
			.notNull()
			.references(() => users.id, { onDelete: 'cascade' }),
		provider: text('provider').notNull(),
		providerAccountId: text('provider_account_id').notNull()
	},
	(t) => ({
		pk: primaryKey({ columns: [t.providerAccountId, t.provider] })
	})
);

export const accountsRelations = relations(accounts, ({ one }) => ({
	user: one(users, {
		fields: [accounts.userId],
		references: [users.id]
	})
}));

export type Account = (typeof accounts)['$inferSelect'];
export type AccountInsert = (typeof accounts)['$inferInsert'];
