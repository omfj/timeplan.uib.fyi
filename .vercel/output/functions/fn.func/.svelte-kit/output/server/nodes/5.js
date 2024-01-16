export const index = 5;
let component_cache;
export const component = async () =>
	(component_cache ??= (await import('../entries/pages/logg-inn/_page.svelte.js')).default);
export const imports = [
	'_app/immutable/nodes/5.cqNBcQAx.js',
	'_app/immutable/chunks/disclose-version.kdlgi_eV.js',
	'_app/immutable/chunks/runtime.zBIj1Mfk.js'
];
export const stylesheets = [];
export const fonts = [];
