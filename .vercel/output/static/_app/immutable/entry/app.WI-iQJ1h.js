import {
	f as S,
	h as y,
	j,
	b as B,
	k as v,
	p as q,
	a as U,
	l as b,
	m as R,
	t as M
} from '../chunks/runtime.zBIj1Mfk.js';
import {
	l as N,
	j as k,
	m as P,
	c as g,
	k as W,
	e as T,
	b as p,
	s as A,
	a as z,
	p as F,
	o as G,
	n as w,
	f as H,
	q as J,
	d as I,
	r as L
} from '../chunks/disclose-version.kdlgi_eV.js';
import { o as K } from '../chunks/main-client.NR1UPAms.js';
function Q(a) {
	return class extends X {
		constructor(e) {
			super({ component: a, ...e });
		}
	};
}
class X {
	#e = {};
	#t;
	constructor(e) {
		this.#t = N(e.component, {
			target: e.target,
			props: { ...e.props, $$events: this.#e },
			context: e.context,
			intro: e.intro,
			recover: e.recover
		});
		for (const t of Object.keys(this.#t))
			t === '$set' ||
				t === '$destroy' ||
				S(this, t, {
					get() {
						return this.#t[t];
					},
					set(n) {
						this.#t[t] = n;
					},
					enumerable: !0
				});
	}
	$set(e) {
		this.#t.$set(e);
	}
	$on(e, t) {
		this.#e[e] = this.#e[e] || [];
		const n = (...i) => t.call(this, ...i);
		return (
			this.#e[e].push(n),
			() => {
				this.#e[e] = this.#e[e].filter((i) => i !== n);
			}
		);
	}
	$destroy() {
		this.#t.$destroy();
	}
}
const Y = 'modulepreload',
	Z = function (a, e) {
		return new URL(a, e).href;
	},
	D = {},
	_ = function (e, t, n) {
		let i = Promise.resolve();
		if (t && t.length > 0) {
			const l = document.getElementsByTagName('link');
			i = Promise.all(
				t.map((r) => {
					if (((r = Z(r, n)), r in D)) return;
					D[r] = !0;
					const m = r.endsWith('.css'),
						h = m ? '[rel="stylesheet"]' : '';
					if (!!n)
						for (let s = l.length - 1; s >= 0; s--) {
							const o = l[s];
							if (o.href === r && (!m || o.rel === 'stylesheet')) return;
						}
					else if (document.querySelector(`link[href="${r}"]${h}`)) return;
					const c = document.createElement('link');
					if (
						((c.rel = m ? 'stylesheet' : Y),
						m || ((c.as = 'script'), (c.crossOrigin = '')),
						(c.href = r),
						document.head.appendChild(c),
						m)
					)
						return new Promise((s, o) => {
							c.addEventListener('load', s),
								c.addEventListener('error', () => o(new Error(`Unable to preload CSS for ${r}`)));
						});
				})
			);
		}
		return i
			.then(() => e())
			.catch((l) => {
				const r = new Event('vite:preloadError', { cancelable: !0 });
				if (((r.payload = l), window.dispatchEvent(r), !r.defaultPrevented)) throw l;
			});
	},
	ae = {};
var $ = I(
		'<div id="svelte-announcer" aria-live="assertive" aria-atomic="true" style="position: absolute; left: 0; top: 0; clip: rect(0 0 0 0); clip-path: inset(50%); overflow: hidden; white-space: nowrap; width: 1px; height: 1px"><!></div>'
	),
	ee = I('<!> <!>', !0);
function te(a, e) {
	U(e, !0);
	let t = y(e, 'components', 11, () => []),
		n = y(e, 'data_0', 3, null),
		i = y(e, 'data_1', 3, null);
	j(() => e.stores.page.set(e.page)),
		B(() => {
			e.stores, e.page, e.constructors, t(), e.form, n(), i(), e.stores.page.notify();
		});
	let l = b(!1),
		r = b(!1),
		m = b(null);
	K(() => {
		const s = e.stores.page.subscribe(() => {
			v(l) &&
				(R(r, !0),
				M().then(() => {
					R(m, F(document.title || 'untitled page'));
				}));
		});
		return R(l, !0), s;
	});
	var h = G(a, !0, ee),
		E = p(h),
		c = A(A(E));
	k(
		E,
		() => e.constructors[1],
		(s) => {
			var o = w(s),
				d = p(o);
			P(
				d,
				() => e.constructors[0],
				(f) => {
					L(
						f(d, {
							get data() {
								return n();
							},
							children: (u, re) => {
								var O = w(u),
									x = p(O);
								P(
									x,
									() => e.constructors[1],
									(V) => {
										L(
											V(x, {
												get data() {
													return i();
												},
												get form() {
													return e.form;
												}
											}),
											(C) => (t()[1] = C)
										);
									}
								),
									g(u, O);
							}
						}),
						(u) => (t()[0] = u)
					);
				}
			),
				g(s, o);
		},
		(s) => {
			var o = w(s),
				d = p(o);
			P(
				d,
				() => e.constructors[0],
				(f) => {
					L(
						f(d, {
							get data() {
								return n();
							},
							get form() {
								return e.form;
							}
						}),
						(u) => (t()[0] = u)
					);
				}
			),
				g(s, o);
		}
	),
		k(
			c,
			() => v(l),
			(s) => {
				var o = H(s, !0, $),
					d = z(o);
				k(
					d,
					() => v(r),
					(f) => {
						var u = J(f);
						W(u, () => v(m)), T(f, u);
					},
					null
				),
					T(s, o);
			},
			null
		),
		g(a, h),
		q();
}
const ie = Q(te),
	le = [
		() =>
			_(
				() => import('../nodes/0.XTZLkckg.js'),
				__vite__mapDeps([0, 1, 2, 3, 4, 5, 6, 7, 8]),
				import.meta.url
			),
		() =>
			_(() => import('../nodes/1.gUJ89rIT.js'), __vite__mapDeps([9, 1, 2, 6, 4]), import.meta.url),
		() =>
			_(() => import('../nodes/2.2f93fZwK.js'), __vite__mapDeps([10, 1, 2, 6, 4]), import.meta.url),
		() =>
			_(() => import('../nodes/3.Ng68AMFs.js'), __vite__mapDeps([11, 1, 2, 3, 4]), import.meta.url),
		() =>
			_(() => import('../nodes/4.e2munSt-.js'), __vite__mapDeps([12, 1, 2, 6, 4]), import.meta.url),
		() => _(() => import('../nodes/5.cqNBcQAx.js'), __vite__mapDeps([13, 1, 2]), import.meta.url),
		() =>
			_(() => import('../nodes/6.gAlBCike.js'), __vite__mapDeps([14, 1, 2, 7, 5]), import.meta.url)
	],
	ce = [0],
	ue = { '/': [3], '/emne/[code]': [-5, [], [2]], '/logg-inn': [5], '/profile': [-7] },
	me = {
		handleError: ({ error: a }) => {
			console.error(a);
		},
		reroute: () => {}
	};
export {
	ue as dictionary,
	me as hooks,
	ae as matchers,
	le as nodes,
	ie as root,
	ce as server_loads
};
function __vite__mapDeps(indexes) {
	if (!__vite__mapDeps.viteFileDeps) {
		__vite__mapDeps.viteFileDeps = [
			'../nodes/0.XTZLkckg.js',
			'../chunks/disclose-version.kdlgi_eV.js',
			'../chunks/runtime.zBIj1Mfk.js',
			'../chunks/forms.XHf9R5Qw.js',
			'../chunks/entry.WxN5ThT0.js',
			'../chunks/main-client.NR1UPAms.js',
			'../chunks/stores.tJ5HbWHB.js',
			'../chunks/user.svelte.VqRhIZH3.js',
			'../assets/0.2ZUXhEkd.css',
			'../nodes/1.gUJ89rIT.js',
			'../nodes/2.2f93fZwK.js',
			'../nodes/3.Ng68AMFs.js',
			'../nodes/4.e2munSt-.js',
			'../nodes/5.cqNBcQAx.js',
			'../nodes/6.gAlBCike.js'
		];
	}
	return indexes.map((i) => __vite__mapDeps.viteFileDeps[i]);
}
