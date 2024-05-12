import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	out: './drizzle/migrations',
	schema: './src/lib/db/schemas',
	strict: true,
	verbose: true,
	driver: 'turso',
	dialect: 'sqlite',
	dbCredentials: {
		url: process.env.DATABASE_URL!,
		authToken: process.env.DATABASE_AUTH_TOKEN!
	}
});
