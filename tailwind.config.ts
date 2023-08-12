import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				foreground: 'var(--foreground)',
				background: 'var(--background)',
				border: 'var(--border)'
			}
		}
	},
	plugins: []
} satisfies Config;
