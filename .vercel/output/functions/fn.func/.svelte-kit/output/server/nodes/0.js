import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
let component_cache;
export const component = async () =>
	(component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default);
export { server };
export const server_id = 'src/routes/+layout.server.ts';
export const imports = [
	'_app/immutable/nodes/0.XTZLkckg.js',
	'_app/immutable/chunks/disclose-version.kdlgi_eV.js',
	'_app/immutable/chunks/runtime.zBIj1Mfk.js',
	'_app/immutable/chunks/forms.XHf9R5Qw.js',
	'_app/immutable/chunks/entry.WxN5ThT0.js',
	'_app/immutable/chunks/main-client.NR1UPAms.js',
	'_app/immutable/chunks/stores.tJ5HbWHB.js',
	'_app/immutable/chunks/user.svelte.VqRhIZH3.js'
];
export const stylesheets = ['_app/immutable/assets/0.2ZUXhEkd.css'];
export const fonts = [];
