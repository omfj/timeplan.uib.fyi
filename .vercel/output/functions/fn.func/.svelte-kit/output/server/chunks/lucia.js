import { Lucia } from 'lucia';
import { D as DATABASE_URL, b as DATABASE_AUTH_TOKEN, d as dev } from './private.js';
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { sqliteTable, text, primaryKey, uniqueIndex, integer } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';
import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
const users = sqliteTable(
	'user',
	{
		id: text('id').notNull(),
		name: text('name'),
		email: text('email')
	},
	(t) => ({
		pk: primaryKey({ columns: [t.id] }),
		uniqueEmailIdx: uniqueIndex('unique_email_idx').on(t.email)
	})
);
const usersRelations = relations(users, ({ many }) => ({
	sessions: many(sessions),
	accounts: many(accounts)
}));
const accounts = sqliteTable(
	'account',
	{
		userId: text('user_id')
			.notNull()
			.references(() => users.id, { onDelete: 'cascade' }),
		provider: text('provider').notNull(),
		providerAccountId: text('provider_account_id').notNull(),
		refreshToken: text('refresh_token'),
		accessToken: text('access_token'),
		expiresAt: integer('expires_at'),
		tokenType: text('token_type'),
		scope: text('scope'),
		idToken: text('id_token')
	},
	(t) => ({
		pk: primaryKey({ columns: [t.providerAccountId, t.provider] })
	})
);
const accountsRelations = relations(accounts, ({ one }) => ({
	user: one(users, {
		fields: [accounts.userId],
		references: [users.id]
	})
}));
const sessions = sqliteTable(
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
const sessionsRelations = relations(sessions, ({ one }) => ({
	user: one(users, {
		fields: [sessions.userId],
		references: [users.id]
	})
}));
const schema = /* @__PURE__ */ Object.freeze(
	/* @__PURE__ */ Object.defineProperty(
		{
			__proto__: null,
			accounts,
			accountsRelations,
			sessions,
			sessionsRelations,
			users,
			usersRelations
		},
		Symbol.toStringTag,
		{ value: 'Module' }
	)
);
const client = createClient({
	url: DATABASE_URL,
	authToken: DATABASE_AUTH_TOKEN
});
const db = drizzle(client, {
	schema
});
const adapter = new DrizzlePostgreSQLAdapter(db, sessions, users);
const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: !dev
		}
	}
});
export { accounts as a, db as d, lucia as l, users as u };
