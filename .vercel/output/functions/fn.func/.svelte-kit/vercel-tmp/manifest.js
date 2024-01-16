export const manifest = (() => {
	function __memo(fn) {
		let value;
		return () => (value ??= value = fn());
	}

	return {
		appDir: '_app',
		appPath: '_app',
		assets: new Set(['favicon.png']),
		mimeTypes: { '.png': 'image/png' },
		_: {
			client: {
				start: '_app/immutable/entry/start.DNTw_xNX.js',
				app: '_app/immutable/entry/app.WI-iQJ1h.js',
				imports: [
					'_app/immutable/entry/start.DNTw_xNX.js',
					'_app/immutable/chunks/entry.WxN5ThT0.js',
					'_app/immutable/chunks/runtime.zBIj1Mfk.js',
					'_app/immutable/entry/app.WI-iQJ1h.js',
					'_app/immutable/chunks/runtime.zBIj1Mfk.js',
					'_app/immutable/chunks/disclose-version.kdlgi_eV.js',
					'_app/immutable/chunks/main-client.NR1UPAms.js'
				],
				stylesheets: [],
				fonts: [],
				uses_env_dynamic_public: false
			},
			nodes: [
				__memo(() => import('../output/server/nodes/0.js')),
				__memo(() => import('../output/server/nodes/1.js')),
				__memo(() => import('../output/server/nodes/2.js')),
				__memo(() => import('../output/server/nodes/3.js')),
				__memo(() => import('../output/server/nodes/4.js')),
				__memo(() => import('../output/server/nodes/5.js')),
				__memo(() => import('../output/server/nodes/6.js'))
			],
			routes: [
				{
					id: '/',
					pattern: /^\/$/,
					params: [],
					page: { layouts: [0], errors: [1], leaf: 3 },
					endpoint: null
				},
				{
					id: '/api/auth/feide',
					pattern: /^\/api\/auth\/feide\/?$/,
					params: [],
					page: null,
					endpoint: __memo(
						() => import('../output/server/entries/endpoints/api/auth/feide/_server.ts.js')
					)
				},
				{
					id: '/api/auth/feide/callback',
					pattern: /^\/api\/auth\/feide\/callback\/?$/,
					params: [],
					page: null,
					endpoint: __memo(
						() => import('../output/server/entries/endpoints/api/auth/feide/callback/_server.ts.js')
					)
				},
				{
					id: '/api/auth/logout',
					pattern: /^\/api\/auth\/logout\/?$/,
					params: [],
					page: null,
					endpoint: __memo(
						() => import('../output/server/entries/endpoints/api/auth/logout/_server.ts.js')
					)
				},
				{
					id: '/emne/[code]',
					pattern: /^\/emne\/([^/]+?)\/?$/,
					params: [{ name: 'code', optional: false, rest: false, chained: false }],
					page: { layouts: [0, ,], errors: [1, 2], leaf: 4 },
					endpoint: null
				},
				{
					id: '/logg-inn',
					pattern: /^\/logg-inn\/?$/,
					params: [],
					page: { layouts: [0], errors: [1], leaf: 5 },
					endpoint: null
				},
				{
					id: '/profile',
					pattern: /^\/profile\/?$/,
					params: [],
					page: { layouts: [0], errors: [1], leaf: 6 },
					endpoint: null
				}
			],
			matchers: async () => {
				return {};
			}
		}
	};
})();
