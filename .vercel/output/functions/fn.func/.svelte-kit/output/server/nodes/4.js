import * as server from '../entries/pages/emne/_code_/_page.server.ts.js';

export const index = 4;
let component_cache;
export const component = async () =>
	(component_cache ??= (await import('../entries/pages/emne/_code_/_page.svelte.js')).default);
export { server };
export const server_id = 'src/routes/emne/[code]/+page.server.ts';
export const imports = [
	'_app/immutable/nodes/4.e2munSt-.js',
	'_app/immutable/chunks/disclose-version.kdlgi_eV.js',
	'_app/immutable/chunks/runtime.zBIj1Mfk.js',
	'_app/immutable/chunks/stores.tJ5HbWHB.js',
	'_app/immutable/chunks/entry.WxN5ThT0.js'
];
export const stylesheets = [];
export const fonts = [];
