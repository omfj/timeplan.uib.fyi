export const index = 1;
let component_cache;
export const component = async () =>
	(component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default);
export const imports = [
	'_app/immutable/nodes/1.gUJ89rIT.js',
	'_app/immutable/chunks/disclose-version.kdlgi_eV.js',
	'_app/immutable/chunks/runtime.zBIj1Mfk.js',
	'_app/immutable/chunks/stores.tJ5HbWHB.js',
	'_app/immutable/chunks/entry.WxN5ThT0.js'
];
export const stylesheets = [];
export const fonts = [];
