import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

const baseConfig = defineConfig({
	out: './drizzle/migrations',
	schema: './src/lib/db/schemas',
	strict: true,
	verbose: true
});

const devConfig = defineConfig({
	...baseConfig,
	driver: 'libsql',
	dbCredentials: {
		url: process.env.DATABASE_URL!
	}
});

const prodConfig = defineConfig({
	...baseConfig,
	driver: 'turso',
	dbCredentials: {
		url: process.env.DATABASE_URL!,
		authToken: process.env.DATABASE_AUTH_TOKEN!
	}
});

export default process.env.NODE_ENV === 'production' ? prodConfig : devConfig;
