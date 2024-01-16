import * as server from '../entries/pages/_page.server.ts.js';

export const index = 3;
let component_cache;
export const component = async () =>
	(component_cache ??= (await import('../entries/pages/_page.svelte.js')).default);
export { server };
export const server_id = 'src/routes/+page.server.ts';
export const imports = [
	'_app/immutable/nodes/3.Ng68AMFs.js',
	'_app/immutable/chunks/disclose-version.kdlgi_eV.js',
	'_app/immutable/chunks/runtime.zBIj1Mfk.js',
	'_app/immutable/chunks/forms.XHf9R5Qw.js',
	'_app/immutable/chunks/entry.WxN5ThT0.js'
];
export const stylesheets = [];
export const fonts = [];
