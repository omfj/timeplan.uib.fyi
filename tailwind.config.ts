import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			container: {
				center: true,
				padding: '1rem',
				screens: {
					'2xl': '1280px'
				}
			},
			colors: {
				foreground: 'var(--foreground)',
				background: 'var(--background)',
				border: 'var(--border)',
				hover: 'var(--hover)'
			}
		}
	},
	plugins: []
} satisfies Config;
