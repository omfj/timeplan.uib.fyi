import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	out: './drizzle/migrations',
	schema: './src/lib/db/schemas',
	driver: 'libsql',
	dbCredentials: {
		url: process.env.DATABASE_URL!
	},
	strict: true,
	verbose: true
});
