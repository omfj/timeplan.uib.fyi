import * as server from '../entries/pages/profile/_page.server.ts.js';

export const index = 6;
let component_cache;
export const component = async () =>
	(component_cache ??= (await import('../entries/pages/profile/_page.svelte.js')).default);
export { server };
export const server_id = 'src/routes/profile/+page.server.ts';
export const imports = [
	'_app/immutable/nodes/6.gAlBCike.js',
	'_app/immutable/chunks/disclose-version.kdlgi_eV.js',
	'_app/immutable/chunks/runtime.zBIj1Mfk.js',
	'_app/immutable/chunks/user.svelte.VqRhIZH3.js',
	'_app/immutable/chunks/main-client.NR1UPAms.js'
];
export const stylesheets = [];
export const fonts = [];
