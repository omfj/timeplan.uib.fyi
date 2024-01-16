import { ai as Ve, t as me } from './runtime.zBIj1Mfk.js';
new URL('sveltekit-internal://');
function lt(e, t) {
	return e === '/' || t === 'ignore'
		? e
		: t === 'never'
			? e.endsWith('/')
				? e.slice(0, -1)
				: e
			: t === 'always' && !e.endsWith('/')
				? e + '/'
				: e;
}
function ut(e) {
	return e.split('%25').map(decodeURI).join('%25');
}
function ft(e) {
	for (const t in e) e[t] = decodeURIComponent(e[t]);
	return e;
}
function pe({ href: e }) {
	return e.split('#')[0];
}
const dt = ['href', 'pathname', 'search', 'toString', 'toJSON'];
function pt(e, t, n) {
	const r = new URL(e);
	Object.defineProperty(r, 'searchParams', {
		value: new Proxy(r.searchParams, {
			get(a, o) {
				if (o === 'get' || o === 'getAll' || o === 'has') return (s) => (n(s), a[o](s));
				t();
				const i = Reflect.get(a, o);
				return typeof i == 'function' ? i.bind(a) : i;
			}
		}),
		enumerable: !0,
		configurable: !0
	});
	for (const a of dt)
		Object.defineProperty(r, a, {
			get() {
				return t(), e[a];
			},
			enumerable: !0,
			configurable: !0
		});
	return r;
}
const ht = '/__data.json',
	gt = '.html__data.json';
function _t(e) {
	return e.endsWith('.html') ? e.replace(/\.html$/, gt) : e.replace(/\/$/, '') + ht;
}
function mt(...e) {
	let t = 5381;
	for (const n of e)
		if (typeof n == 'string') {
			let r = n.length;
			for (; r; ) t = (t * 33) ^ n.charCodeAt(--r);
		} else if (ArrayBuffer.isView(n)) {
			const r = new Uint8Array(n.buffer, n.byteOffset, n.byteLength);
			let a = r.length;
			for (; a; ) t = (t * 33) ^ r[--a];
		} else throw new TypeError('value must be a string or TypedArray');
	return (t >>> 0).toString(36);
}
const Fe = window.fetch;
window.fetch = (e, t) => (
	(e instanceof Request ? e.method : t?.method || 'GET') !== 'GET' && F.delete(Ee(e)), Fe(e, t)
);
const F = new Map();
function yt(e) {
	const t = atob(e),
		n = new Uint8Array(t.length);
	for (let r = 0; r < t.length; r++) n[r] = t.charCodeAt(r);
	return n.buffer;
}
function wt(e, t) {
	const n = Ee(e, t),
		r = document.querySelector(n);
	if (r?.textContent) {
		let { body: a, ...o } = JSON.parse(r.textContent);
		const i = r.getAttribute('data-ttl');
		return (
			i && F.set(n, { body: a, init: o, ttl: 1e3 * Number(i) }),
			r.getAttribute('data-b64') !== null && (a = yt(a)),
			Promise.resolve(new Response(a, o))
		);
	}
	return window.fetch(e, t);
}
function vt(e, t, n) {
	if (F.size > 0) {
		const r = Ee(e, n),
			a = F.get(r);
		if (a) {
			if (
				performance.now() < a.ttl &&
				['default', 'force-cache', 'only-if-cached', void 0].includes(n?.cache)
			)
				return new Response(a.body, a.init);
			F.delete(r);
		}
	}
	return window.fetch(t, n);
}
function Ee(e, t) {
	let r = `script[data-sveltekit-fetched][data-url=${JSON.stringify(e instanceof Request ? e.url : e)}]`;
	if (t?.headers || t?.body) {
		const a = [];
		t.headers && a.push([...new Headers(t.headers)].join(',')),
			t.body && (typeof t.body == 'string' || ArrayBuffer.isView(t.body)) && a.push(t.body),
			(r += `[data-hash="${mt(...a)}"]`);
	}
	return r;
}
const bt = /^(\[)?(\.\.\.)?(\w+)(?:=(\w+))?(\])?$/;
function Et(e) {
	const t = [];
	return {
		pattern:
			e === '/'
				? /^\/$/
				: new RegExp(
						`^${At(e)
							.map((r) => {
								const a = /^\[\.\.\.(\w+)(?:=(\w+))?\]$/.exec(r);
								if (a)
									return (
										t.push({ name: a[1], matcher: a[2], optional: !1, rest: !0, chained: !0 }),
										'(?:/(.*))?'
									);
								const o = /^\[\[(\w+)(?:=(\w+))?\]\]$/.exec(r);
								if (o)
									return (
										t.push({ name: o[1], matcher: o[2], optional: !0, rest: !1, chained: !0 }),
										'(?:/([^/]+))?'
									);
								if (!r) return;
								const i = r.split(/\[(.+?)\](?!\])/);
								return (
									'/' +
									i
										.map((c, l) => {
											if (l % 2) {
												if (c.startsWith('x+'))
													return he(String.fromCharCode(parseInt(c.slice(2), 16)));
												if (c.startsWith('u+'))
													return he(
														String.fromCharCode(
															...c
																.slice(2)
																.split('-')
																.map((h) => parseInt(h, 16))
														)
													);
												const d = bt.exec(c),
													[, g, f, u, p] = d;
												return (
													t.push({
														name: u,
														matcher: p,
														optional: !!g,
														rest: !!f,
														chained: f ? l === 1 && i[0] === '' : !1
													}),
													f ? '(.*?)' : g ? '([^/]*)?' : '([^/]+?)'
												);
											}
											return he(c);
										})
										.join('')
								);
							})
							.join('')}/?$`
					),
		params: t
	};
}
function kt(e) {
	return !/^\([^)]+\)$/.test(e);
}
function At(e) {
	return e.slice(1).split('/').filter(kt);
}
function St(e, t, n) {
	const r = {},
		a = e.slice(1),
		o = a.filter((s) => s !== void 0);
	let i = 0;
	for (let s = 0; s < t.length; s += 1) {
		const c = t[s];
		let l = a[s - i];
		if (
			(c.chained &&
				c.rest &&
				i &&
				((l = a
					.slice(s - i, s + 1)
					.filter((d) => d)
					.join('/')),
				(i = 0)),
			l === void 0)
		) {
			c.rest && (r[c.name] = '');
			continue;
		}
		if (!c.matcher || n[c.matcher](l)) {
			r[c.name] = l;
			const d = t[s + 1],
				g = a[s + 1];
			d && !d.rest && d.optional && g && c.chained && (i = 0),
				!d && !g && Object.keys(r).length === o.length && (i = 0);
			continue;
		}
		if (c.optional && c.chained) {
			i++;
			continue;
		}
		return;
	}
	if (!i) return r;
}
function he(e) {
	return e
		.normalize()
		.replace(/[[\]]/g, '\\$&')
		.replace(/%/g, '%25')
		.replace(/\//g, '%2[Ff]')
		.replace(/\?/g, '%3[Ff]')
		.replace(/#/g, '%23')
		.replace(/[.*+?^${}()|\\]/g, '\\$&');
}
function Rt({ nodes: e, server_loads: t, dictionary: n, matchers: r }) {
	const a = new Set(t);
	return Object.entries(n).map(([s, [c, l, d]]) => {
		const { pattern: g, params: f } = Et(s),
			u = {
				id: s,
				exec: (p) => {
					const h = g.exec(p);
					if (h) return St(h, f, r);
				},
				errors: [1, ...(d || [])].map((p) => e[p]),
				layouts: [0, ...(l || [])].map(i),
				leaf: o(c)
			};
		return (u.errors.length = u.layouts.length = Math.max(u.errors.length, u.layouts.length)), u;
	});
	function o(s) {
		const c = s < 0;
		return c && (s = ~s), [c, e[s]];
	}
	function i(s) {
		return s === void 0 ? s : [a.has(s), e[s]];
	}
}
function qe(e, t = JSON.parse) {
	try {
		return t(sessionStorage[e]);
	} catch {}
}
function Te(e, t, n = JSON.stringify) {
	const r = n(t);
	try {
		sessionStorage[e] = r;
	} catch {}
}
const N = [];
function q() {}
function It(e, t) {
	return { subscribe: re(e, t).subscribe };
}
function Lt(e, t) {
	return e != e ? t == t : e !== t || (e && typeof e == 'object') || typeof e == 'function';
}
function re(e, t = q) {
	let n = null;
	const r = new Set();
	function a(s) {
		if (Lt(e, s) && ((e = s), n)) {
			const c = !N.length;
			for (const l of r) l[1](), N.push(l, e);
			if (c) {
				for (let l = 0; l < N.length; l += 2) N[l][0](N[l + 1]);
				N.length = 0;
			}
		}
	}
	function o(s) {
		a(s(e));
	}
	function i(s, c = q) {
		const l = [s, c];
		return (
			r.add(l),
			r.size === 1 && (n = t(a, o) || q),
			s(e),
			() => {
				r.delete(l), r.size === 0 && n && (n(), (n = null));
			}
		);
	}
	return { set: a, update: o, subscribe: i };
}
function Pt(e) {
	return e();
}
function Ut(e) {
	e.forEach(Pt);
}
function rn(e, t, n) {
	const r = !Array.isArray(e),
		a = r ? [e] : e;
	if (!a.every(Boolean)) throw new Error('derived() expects stores as input, got a falsy value');
	const o = t.length < 2;
	return It(n, (i, s) => {
		let c = !1;
		const l = [];
		let d = 0,
			g = q;
		const f = () => {
				if (d) return;
				g();
				const p = t(r ? l[0] : l, i, s);
				o ? i(p) : (g = typeof p == 'function' ? p : q);
			},
			u = a.map((p, h) =>
				Ve(
					p,
					(A) => {
						(l[h] = A), (d &= ~(1 << h)), c && f();
					},
					() => {
						d |= 1 << h;
					}
				)
			);
		return (
			(c = !0),
			f(),
			function () {
				Ut(u), g(), (c = !1);
			}
		);
	});
}
function an(e) {
	let t;
	return Ve(e, (n) => (t = n))(), t;
}
const R = globalThis.__sveltekit_bolku5?.base ?? '',
	xt = globalThis.__sveltekit_bolku5?.assets ?? R,
	Tt = '1705418095479',
	Ge = 'sveltekit:snapshot',
	Me = 'sveltekit:scroll',
	Be = 'sveltekit:states',
	Nt = 'sveltekit:pageurl',
	j = 'sveltekit:history',
	M = 'sveltekit:navigation',
	X = { tap: 1, hover: 2, viewport: 3, eager: 4, off: -1, false: -1 },
	J = location.origin;
function He(e) {
	if (e instanceof URL) return e;
	let t = document.baseURI;
	if (!t) {
		const n = document.getElementsByTagName('base');
		t = n.length ? n[0].href : document.URL;
	}
	return new URL(e, t);
}
function ke() {
	return { x: pageXOffset, y: pageYOffset };
}
function O(e, t) {
	return e.getAttribute(`data-sveltekit-${t}`);
}
const Ne = { ...X, '': X.hover };
function Ke(e) {
	let t = e.assignedSlot ?? e.parentNode;
	return t?.nodeType === 11 && (t = t.host), t;
}
function ze(e, t) {
	for (; e && e !== t; ) {
		if (e.nodeName.toUpperCase() === 'A' && e.hasAttribute('href')) return e;
		e = Ke(e);
	}
}
function ye(e, t) {
	let n;
	try {
		n = new URL(e instanceof SVGAElement ? e.href.baseVal : e.href, document.baseURI);
	} catch {}
	const r = e instanceof SVGAElement ? e.target.baseVal : e.target,
		a = !n || !!r || ae(n, t) || (e.getAttribute('rel') || '').split(/\s+/).includes('external'),
		o = n?.origin === J && e.hasAttribute('download');
	return { url: n, external: a, target: r, download: o };
}
function Z(e) {
	let t = null,
		n = null,
		r = null,
		a = null,
		o = null,
		i = null,
		s = e;
	for (; s && s !== document.documentElement; )
		r === null && (r = O(s, 'preload-code')),
			a === null && (a = O(s, 'preload-data')),
			t === null && (t = O(s, 'keepfocus')),
			n === null && (n = O(s, 'noscroll')),
			o === null && (o = O(s, 'reload')),
			i === null && (i = O(s, 'replacestate')),
			(s = Ke(s));
	function c(l) {
		switch (l) {
			case '':
			case 'true':
				return !0;
			case 'off':
			case 'false':
				return !1;
			default:
				return;
		}
	}
	return {
		preload_code: Ne[r ?? 'off'],
		preload_data: Ne[a ?? 'off'],
		keepfocus: c(t),
		noscroll: c(n),
		reload: c(o),
		replace_state: c(i)
	};
}
function Oe(e) {
	const t = re(e);
	let n = !0;
	function r() {
		(n = !0), t.update((i) => i);
	}
	function a(i) {
		(n = !1), t.set(i);
	}
	function o(i) {
		let s;
		return t.subscribe((c) => {
			(s === void 0 || (n && c !== s)) && i((s = c));
		});
	}
	return { notify: r, set: a, subscribe: o };
}
function Ot() {
	const { set: e, subscribe: t } = re(!1);
	let n;
	async function r() {
		clearTimeout(n);
		try {
			const a = await fetch(`${xt}/_app/version.json`, {
				headers: { pragma: 'no-cache', 'cache-control': 'no-cache' }
			});
			if (!a.ok) return !1;
			const i = (await a.json()).version !== Tt;
			return i && (e(!0), clearTimeout(n)), i;
		} catch {
			return !1;
		}
	}
	return { subscribe: t, check: r };
}
function ae(e, t) {
	return e.origin !== J || !e.pathname.startsWith(t);
}
const jt = -1,
	$t = -2,
	Dt = -3,
	Ct = -4,
	Vt = -5,
	Ft = -6;
function on(e, t) {
	return Je(JSON.parse(e), t);
}
function Je(e, t) {
	if (typeof e == 'number') return a(e, !0);
	if (!Array.isArray(e) || e.length === 0) throw new Error('Invalid input');
	const n = e,
		r = Array(n.length);
	function a(o, i = !1) {
		if (o === jt) return;
		if (o === Dt) return NaN;
		if (o === Ct) return 1 / 0;
		if (o === Vt) return -1 / 0;
		if (o === Ft) return -0;
		if (i) throw new Error('Invalid input');
		if (o in r) return r[o];
		const s = n[o];
		if (!s || typeof s != 'object') r[o] = s;
		else if (Array.isArray(s))
			if (typeof s[0] == 'string') {
				const c = s[0],
					l = t?.[c];
				if (l) return (r[o] = l(a(s[1])));
				switch (c) {
					case 'Date':
						r[o] = new Date(s[1]);
						break;
					case 'Set':
						const d = new Set();
						r[o] = d;
						for (let u = 1; u < s.length; u += 1) d.add(a(s[u]));
						break;
					case 'Map':
						const g = new Map();
						r[o] = g;
						for (let u = 1; u < s.length; u += 2) g.set(a(s[u]), a(s[u + 1]));
						break;
					case 'RegExp':
						r[o] = new RegExp(s[1], s[2]);
						break;
					case 'Object':
						r[o] = Object(s[1]);
						break;
					case 'BigInt':
						r[o] = BigInt(s[1]);
						break;
					case 'null':
						const f = Object.create(null);
						r[o] = f;
						for (let u = 1; u < s.length; u += 2) f[s[u]] = a(s[u + 1]);
						break;
					default:
						throw new Error(`Unknown type ${c}`);
				}
			} else {
				const c = new Array(s.length);
				r[o] = c;
				for (let l = 0; l < s.length; l += 1) {
					const d = s[l];
					d !== $t && (c[l] = a(d));
				}
			}
		else {
			const c = {};
			r[o] = c;
			for (const l in s) {
				const d = s[l];
				c[l] = a(d);
			}
		}
		return r[o];
	}
	return a(0);
}
const Ye = new Set(['load', 'prerender', 'csr', 'ssr', 'trailingSlash', 'config']);
[...Ye];
const qt = new Set([...Ye]);
[...qt];
function Gt(e) {
	return e.filter((t) => t != null);
}
class oe {
	constructor(t, n) {
		(this.status = t),
			typeof n == 'string'
				? (this.body = { message: n })
				: n
					? (this.body = n)
					: (this.body = { message: `Error: ${t}` });
	}
	toString() {
		return JSON.stringify(this.body);
	}
}
class We {
	constructor(t, n) {
		(this.status = t), (this.location = n);
	}
}
class Ae extends Error {
	constructor(t, n, r) {
		super(r), (this.status = t), (this.text = n);
	}
}
const Mt = 'x-sveltekit-invalidated',
	Bt = 'x-sveltekit-trailing-slash';
function Q(e) {
	return e instanceof oe || e instanceof Ae ? e.status : 500;
}
function Ht(e) {
	return e instanceof Ae ? e.text : 'Internal Error';
}
const T = qe(Me) ?? {},
	B = qe(Ge) ?? {},
	Kt = history.pushState,
	Se = history.replaceState,
	L = { url: Oe({}), page: Oe({}), navigating: re(null), updated: Ot() };
function Re(e) {
	T[e] = ke();
}
function zt(e, t) {
	let n = e + 1;
	for (; T[n]; ) delete T[n], (n += 1);
	for (n = t + 1; B[n]; ) delete B[n], (n += 1);
}
function $(e) {
	return (location.href = e.href), new Promise(() => {});
}
function je() {}
let se, we, ee, I, ve, C;
const Ie = [],
	te = [];
let U = null;
const Xe = [],
	Jt = [];
let G = [],
	m = { branch: [], error: null, url: null },
	Le = !1,
	ne = !1,
	$e = !0,
	H = !1,
	V = !1,
	Ze = !1,
	ie = !1,
	x,
	w,
	S,
	k,
	D,
	ge;
async function sn(e, t, n) {
	document.URL !== location.href && (location.href = location.href),
		(C = e),
		(se = Rt(e)),
		(I = document.documentElement),
		(ve = t),
		(we = e.nodes[0]),
		(ee = e.nodes[1]),
		we(),
		ee(),
		(w = history.state?.[j]),
		(S = history.state?.[M]),
		w || ((w = S = Date.now()), Se.call(history, { ...history.state, [j]: w, [M]: S }, ''));
	const r = T[w];
	r && ((history.scrollRestoration = 'manual'), scrollTo(r.x, r.y)),
		n ? await tn(ve, n) : Qt(location.href, { replaceState: !0 }),
		en();
}
async function Yt() {
	if ((await (ge ||= Promise.resolve()), !ge)) return;
	ge = null;
	const e = ue(m.url, !0);
	U = null;
	const t = (D = {}),
		n = e && (await xe(e));
	t === D &&
		(n &&
			(n.type === 'redirect'
				? await ce(new URL(n.location, m.url).href, {}, 1, t)
				: (n.props.page !== void 0 && (k = n.props.page), x.$set(n.props))),
		(Ie.length = 0));
}
function Qe(e) {
	te.some((t) => t?.snapshot) && (B[e] = te.map((t) => t?.snapshot?.capture()));
}
function et(e) {
	B[e]?.forEach((t, n) => {
		te[n]?.snapshot?.restore(t);
	});
}
function De() {
	Re(w), Te(Me, T), Qe(S), Te(Ge, B);
}
async function ce(e, t, n, r) {
	return W({
		type: 'goto',
		url: He(e),
		keepfocus: t.keepFocus,
		noscroll: t.noScroll,
		replace_state: t.replaceState,
		state: t.state,
		redirect_count: n,
		nav_token: r,
		accept: () => {
			t.invalidateAll && (ie = !0);
		}
	});
}
async function Wt(e) {
	return (
		(U = {
			id: e.id,
			promise: xe(e).then((t) => (t.type === 'loaded' && t.state.error && (U = null), t))
		}),
		U.promise
	);
}
async function _e(e) {
	const t = se.find((n) => n.exec(rt(e)));
	t && (await Promise.all([...t.layouts, t.leaf].map((n) => n?.[1]())));
}
function tt(e, t) {
	m = e.state;
	const n = document.querySelector('style[data-sveltekit]');
	n && n.remove(),
		(k = e.props.page),
		(x = new C.root({ target: t, props: { ...e.props, stores: L, components: te }, hydrate: !0 })),
		et(S);
	const r = {
		from: null,
		to: { params: m.params, route: { id: m.route?.id ?? null }, url: new URL(location.href) },
		willUnload: !1,
		type: 'enter',
		complete: Promise.resolve()
	};
	G.forEach((a) => a(r)), (ne = !0);
}
async function K({ url: e, params: t, branch: n, status: r, error: a, route: o, form: i }) {
	let s = 'never';
	if (R && (e.pathname === R || e.pathname === R + '/')) s = 'always';
	else for (const u of n) u?.slash !== void 0 && (s = u.slash);
	(e.pathname = lt(e.pathname, s)), (e.search = e.search);
	const c = {
		type: 'loaded',
		state: { url: e, params: t, branch: n, error: a, route: o },
		props: { constructors: Gt(n).map((u) => u.node.component), page: k }
	};
	i !== void 0 && (c.props.form = i);
	let l = {},
		d = !k,
		g = 0;
	for (let u = 0; u < Math.max(n.length, m.branch.length); u += 1) {
		const p = n[u],
			h = m.branch[u];
		p?.data !== h?.data && (d = !0),
			p && ((l = { ...l, ...p.data }), d && (c.props[`data_${g}`] = l), (g += 1));
	}
	return (
		(!m.url || e.href !== m.url.href || m.error !== a || (i !== void 0 && i !== k.form) || d) &&
			(c.props.page = {
				error: a,
				params: t,
				route: { id: o?.id ?? null },
				state: {},
				status: r,
				url: new URL(e),
				form: i ?? null,
				data: d ? l : k.data
			}),
		c
	);
}
async function Pe({ loader: e, parent: t, url: n, params: r, route: a, server_data_node: o }) {
	let i = null,
		s = !0;
	const c = {
			dependencies: new Set(),
			params: new Set(),
			parent: !1,
			route: !1,
			url: !1,
			search_params: new Set()
		},
		l = await e();
	if (l.universal?.load) {
		let d = function (...f) {
			for (const u of f) {
				const { href: p } = new URL(u, n);
				c.dependencies.add(p);
			}
		};
		const g = {
			route: new Proxy(a, { get: (f, u) => (s && (c.route = !0), f[u]) }),
			params: new Proxy(r, { get: (f, u) => (s && c.params.add(u), f[u]) }),
			data: o?.data ?? null,
			url: pt(
				n,
				() => {
					s && (c.url = !0);
				},
				(f) => {
					s && c.search_params.add(f);
				}
			),
			async fetch(f, u) {
				let p;
				f instanceof Request
					? ((p = f.url),
						(u = {
							body: f.method === 'GET' || f.method === 'HEAD' ? void 0 : await f.blob(),
							cache: f.cache,
							credentials: f.credentials,
							headers: f.headers,
							integrity: f.integrity,
							keepalive: f.keepalive,
							method: f.method,
							mode: f.mode,
							redirect: f.redirect,
							referrer: f.referrer,
							referrerPolicy: f.referrerPolicy,
							signal: f.signal,
							...u
						}))
					: (p = f);
				const h = new URL(p, n);
				return (
					s && d(h.href),
					h.origin === n.origin && (p = h.href.slice(n.origin.length)),
					ne ? vt(p, h.href, u) : wt(p, u)
				);
			},
			setHeaders: () => {},
			depends: d,
			parent() {
				return s && (c.parent = !0), t();
			},
			untrack(f) {
				s = !1;
				try {
					return f();
				} finally {
					s = !0;
				}
			}
		};
		i = (await l.universal.load.call(null, g)) ?? null;
	}
	return {
		node: l,
		loader: e,
		server: o,
		universal: l.universal?.load ? { type: 'data', data: i, uses: c } : null,
		data: i ?? o?.data ?? null,
		slash: l.universal?.trailingSlash ?? o?.slash
	};
}
function Ce(e, t, n, r, a, o) {
	if (ie) return !0;
	if (!a) return !1;
	if ((a.parent && e) || (a.route && t) || (a.url && n)) return !0;
	for (const i of a.search_params) if (r.has(i)) return !0;
	for (const i of a.params) if (o[i] !== m.params[i]) return !0;
	for (const i of a.dependencies) if (Ie.some((s) => s(new URL(i)))) return !0;
	return !1;
}
function Ue(e, t) {
	return e?.type === 'data' ? e : e?.type === 'skip' ? t ?? null : null;
}
function Xt(e, t) {
	if (!e) return new Set(t.searchParams.keys());
	const n = new Set([...e.searchParams.keys(), ...t.searchParams.keys()]);
	for (const r of n) {
		const a = e.searchParams.getAll(r),
			o = t.searchParams.getAll(r);
		a.every((i) => o.includes(i)) && o.every((i) => a.includes(i)) && n.delete(r);
	}
	return n;
}
async function xe({ id: e, invalidating: t, url: n, params: r, route: a }) {
	if (U?.id === e) return U.promise;
	const { errors: o, layouts: i, leaf: s } = a,
		c = [...i, s];
	o.forEach((_) => _?.().catch(() => {})), c.forEach((_) => _?.[1]().catch(() => {}));
	let l = null;
	const d = m.url ? e !== m.url.pathname + m.url.search : !1,
		g = m.route ? a.id !== m.route.id : !1,
		f = Xt(m.url, n);
	let u = !1;
	const p = c.map((_, y) => {
		const v = m.branch[y],
			b = !!_?.[0] && (v?.loader !== _[1] || Ce(u, g, d, f, v.server?.uses, r));
		return b && (u = !0), b;
	});
	if (p.some(Boolean)) {
		try {
			l = await st(n, p);
		} catch (_) {
			return le({
				status: Q(_),
				error: await z(_, { url: n, params: r, route: { id: a.id } }),
				url: n,
				route: a
			});
		}
		if (l.type === 'redirect') return l;
	}
	const h = l?.nodes;
	let A = !1;
	const E = c.map(async (_, y) => {
		if (!_) return;
		const v = m.branch[y],
			b = h?.[y];
		if ((!b || b.type === 'skip') && _[1] === v?.loader && !Ce(A, g, d, f, v.universal?.uses, r))
			return v;
		if (((A = !0), b?.type === 'error')) throw b;
		return Pe({
			loader: _[1],
			url: n,
			params: r,
			route: a,
			parent: async () => {
				const fe = {};
				for (let de = 0; de < y; de += 1) Object.assign(fe, (await E[de])?.data);
				return fe;
			},
			server_data_node: Ue(
				b === void 0 && _[0] ? { type: 'skip' } : b ?? null,
				_[0] ? v?.server : void 0
			)
		});
	});
	for (const _ of E) _.catch(() => {});
	const P = [];
	for (let _ = 0; _ < c.length; _ += 1)
		if (c[_])
			try {
				P.push(await E[_]);
			} catch (y) {
				if (y instanceof We) return { type: 'redirect', location: y.location };
				let v = Q(y),
					b;
				if (h?.includes(y)) (v = y.status ?? v), (b = y.error);
				else if (y instanceof oe) b = y.body;
				else {
					if (await L.updated.check()) return await $(n);
					b = await z(y, { params: r, url: n, route: { id: a.id } });
				}
				const Y = await nt(_, P, o);
				return Y
					? await K({
							url: n,
							params: r,
							branch: P.slice(0, Y.idx).concat(Y.node),
							status: v,
							error: b,
							route: a
						})
					: await ot(n, { id: a.id }, b, v);
			}
		else P.push(void 0);
	return await K({
		url: n,
		params: r,
		branch: P,
		status: 200,
		error: null,
		route: a,
		form: t ? void 0 : null
	});
}
async function nt(e, t, n) {
	for (; e--; )
		if (n[e]) {
			let r = e;
			for (; !t[r]; ) r -= 1;
			try {
				return {
					idx: r + 1,
					node: { node: await n[e](), loader: n[e], data: {}, server: null, universal: null }
				};
			} catch {
				continue;
			}
		}
}
async function le({ status: e, error: t, url: n, route: r }) {
	const a = {};
	let o = null;
	if (C.server_loads[0] === 0)
		try {
			const l = await st(n, [!0]);
			if (l.type !== 'data' || (l.nodes[0] && l.nodes[0].type !== 'data')) throw 0;
			o = l.nodes[0] ?? null;
		} catch {
			(n.origin !== J || n.pathname !== location.pathname || Le) && (await $(n));
		}
	const s = await Pe({
			loader: we,
			url: n,
			params: a,
			route: r,
			parent: () => Promise.resolve({}),
			server_data_node: Ue(o)
		}),
		c = { node: await ee(), loader: ee, universal: null, server: null, data: null };
	return await K({ url: n, params: a, branch: [s, c], status: e, error: t, route: null });
}
function ue(e, t) {
	if (!e || ae(e, R)) return;
	let n;
	try {
		n = C.hooks.reroute({ url: new URL(e) }) ?? e.pathname;
	} catch {
		return;
	}
	const r = rt(n);
	for (const a of se) {
		const o = a.exec(r);
		if (o) return { id: e.pathname + e.search, invalidating: t, route: a, params: ft(o), url: e };
	}
}
function rt(e) {
	return ut(e.slice(R.length) || '/');
}
function at({ url: e, type: t, intent: n, delta: r }) {
	let a = !1;
	const o = ct(m, n, e, t);
	r !== void 0 && (o.navigation.delta = r);
	const i = {
		...o.navigation,
		cancel: () => {
			(a = !0), o.reject(new Error('navigation cancelled'));
		}
	};
	return H || Xe.forEach((s) => s(i)), a ? null : o;
}
async function W({
	type: e,
	url: t,
	popped: n,
	keepfocus: r,
	noscroll: a,
	replace_state: o,
	state: i = {},
	redirect_count: s = 0,
	nav_token: c = {},
	accept: l = je,
	block: d = je
}) {
	const g = ue(t, !1),
		f = at({ url: t, type: e, delta: n?.delta, intent: g });
	if (!f) {
		d();
		return;
	}
	const u = w,
		p = S;
	l(), (H = !0), ne && L.navigating.set(f.navigation), (D = c);
	let h = g && (await xe(g));
	if (!h) {
		if (ae(t, R)) return await $(t);
		h = await ot(
			t,
			{ id: null },
			await z(new Ae(404, 'Not Found', `Not found: ${t.pathname}`), {
				url: t,
				params: {},
				route: { id: null }
			}),
			404
		);
	}
	if (((t = g?.url || t), D !== c)) return f.reject(new Error('navigation aborted')), !1;
	if (h.type === 'redirect')
		if (s >= 20)
			h = await le({
				status: 500,
				error: await z(new Error('Redirect loop'), { url: t, params: {}, route: { id: null } }),
				url: t,
				route: { id: null }
			});
		else return ce(new URL(h.location, t).href, {}, s + 1, c), !1;
	else h.props.page.status >= 400 && (await L.updated.check()) && (await $(t));
	if (
		((Ie.length = 0),
		(ie = !1),
		Re(u),
		Qe(p),
		h.props.page.url.pathname !== t.pathname && (t.pathname = h.props.page.url.pathname),
		(i = n ? n.state : i),
		!n)
	) {
		const _ = o ? 0 : 1,
			y = { [j]: (w += _), [M]: (S += _), [Be]: i };
		(o ? Se : Kt).call(history, y, '', t), o || zt(w, S);
	}
	if (((U = null), (h.props.page.state = i), ne)) {
		(m = h.state), h.props.page && (h.props.page.url = t);
		const _ = (await Promise.all(Jt.map((y) => y(f.navigation)))).filter(
			(y) => typeof y == 'function'
		);
		if (_.length > 0) {
			let y = function () {
				G = G.filter((v) => !_.includes(v));
			};
			_.push(y), callbacks.after_navigate.push(..._);
		}
		x.$set(h.props), (Ze = !0);
	} else tt(h, ve);
	const { activeElement: A } = document;
	await me();
	const E = n ? n.scroll : a ? ke() : null;
	if ($e) {
		const _ = t.hash && document.getElementById(decodeURIComponent(t.hash.slice(1)));
		E ? scrollTo(E.x, E.y) : _ ? _.scrollIntoView() : scrollTo(0, 0);
	}
	const P = document.activeElement !== A && document.activeElement !== document.body;
	!r && !P && be(),
		($e = !0),
		h.props.page && (k = h.props.page),
		(H = !1),
		e === 'popstate' && et(S),
		f.fulfil(void 0),
		G.forEach((_) => _(f.navigation)),
		L.navigating.set(null);
}
async function ot(e, t, n, r) {
	return e.origin === J && e.pathname === location.pathname && !Le
		? await le({ status: r, error: n, url: e, route: t })
		: await $(e);
}
function Zt() {
	let e;
	I.addEventListener('mousemove', (o) => {
		const i = o.target;
		clearTimeout(e),
			(e = setTimeout(() => {
				r(i, 2);
			}, 20));
	});
	function t(o) {
		r(o.composedPath()[0], 1);
	}
	I.addEventListener('mousedown', t), I.addEventListener('touchstart', t, { passive: !0 });
	const n = new IntersectionObserver(
		(o) => {
			for (const i of o) i.isIntersecting && (_e(i.target.href), n.unobserve(i.target));
		},
		{ threshold: 0 }
	);
	function r(o, i) {
		const s = ze(o, I);
		if (!s) return;
		const { url: c, external: l, download: d } = ye(s, R);
		if (l || d) return;
		const g = Z(s);
		if (!g.reload)
			if (i <= g.preload_data) {
				const f = ue(c, !1);
				f && Wt(f);
			} else i <= g.preload_code && _e(c.pathname);
	}
	function a() {
		n.disconnect();
		for (const o of I.querySelectorAll('a')) {
			const { url: i, external: s, download: c } = ye(o, R);
			if (s || c) continue;
			const l = Z(o);
			l.reload ||
				(l.preload_code === X.viewport && n.observe(o),
				l.preload_code === X.eager && _e(i.pathname));
		}
	}
	G.push(a), a();
}
function z(e, t) {
	if (e instanceof oe) return e.body;
	const n = Q(e),
		r = Ht(e);
	return C.hooks.handleError({ error: e, event: t, status: n, message: r }) ?? { message: r };
}
function Qt(e, t = {}) {
	return (e = He(e)), e.origin !== J ? Promise.reject(new Error('goto: invalid URL')) : ce(e, t, 0);
}
function cn() {
	return (ie = !0), Yt();
}
async function ln(e) {
	if (e.type === 'error') {
		const t = new URL(location.href),
			{ branch: n, route: r } = m;
		if (!r) return;
		const a = await nt(m.branch.length, n, r.errors);
		if (a) {
			const o = await K({
				url: t,
				params: m.params,
				branch: n.slice(0, a.idx).concat(a.node),
				status: e.status ?? 500,
				error: e.error,
				route: r
			});
			(m = o.state), x.$set(o.props), me().then(be);
		}
	} else
		e.type === 'redirect'
			? ce(e.location, { invalidateAll: !0 }, 0)
			: (x.$set({ form: null, page: { ...k, form: e.data, status: e.status } }),
				await me(),
				x.$set({ form: e.data }),
				e.type === 'success' && be());
}
function en() {
	(history.scrollRestoration = 'manual'),
		addEventListener('beforeunload', (t) => {
			let n = !1;
			if ((De(), !H)) {
				const r = ct(m, void 0, null, 'leave'),
					a = {
						...r.navigation,
						cancel: () => {
							(n = !0), r.reject(new Error('navigation cancelled'));
						}
					};
				Xe.forEach((o) => o(a));
			}
			n ? (t.preventDefault(), (t.returnValue = '')) : (history.scrollRestoration = 'auto');
		}),
		addEventListener('visibilitychange', () => {
			document.visibilityState === 'hidden' && De();
		}),
		navigator.connection?.saveData || Zt(),
		I.addEventListener('click', (t) => {
			if (
				t.button ||
				t.which !== 1 ||
				t.metaKey ||
				t.ctrlKey ||
				t.shiftKey ||
				t.altKey ||
				t.defaultPrevented
			)
				return;
			const n = ze(t.composedPath()[0], I);
			if (!n) return;
			const { url: r, external: a, target: o, download: i } = ye(n, R);
			if (!r) return;
			if (o === '_parent' || o === '_top') {
				if (window.parent !== window) return;
			} else if (o && o !== '_self') return;
			const s = Z(n);
			if (
				(!(n instanceof SVGAElement) &&
					r.protocol !== location.protocol &&
					!(r.protocol === 'https:' || r.protocol === 'http:')) ||
				i
			)
				return;
			if (a || s.reload) {
				at({ url: r, type: 'link' }) ? (H = !0) : t.preventDefault();
				return;
			}
			const [l, d] = r.href.split('#');
			if (d !== void 0 && l === pe(location)) {
				const [, g] = m.url.href.split('#');
				if (g === d) {
					t.preventDefault(),
						d === '' || (d === 'top' && n.ownerDocument.getElementById('top') === null)
							? window.scrollTo({ top: 0 })
							: n.ownerDocument.getElementById(d)?.scrollIntoView();
					return;
				}
				if (((V = !0), Re(w), e(r), !s.replace_state)) return;
				V = !1;
			}
			t.preventDefault(),
				W({
					type: 'link',
					url: r,
					keepfocus: s.keepfocus,
					noscroll: s.noscroll,
					replace_state: s.replace_state ?? r.href === location.href
				});
		}),
		I.addEventListener('submit', (t) => {
			if (t.defaultPrevented) return;
			const n = HTMLFormElement.prototype.cloneNode.call(t.target),
				r = t.submitter;
			if ((r?.formMethod || n.method) !== 'get') return;
			const o = new URL((r?.hasAttribute('formaction') && r?.formAction) || n.action);
			if (ae(o, R)) return;
			const i = t.target,
				s = Z(i);
			if (s.reload) return;
			t.preventDefault(), t.stopPropagation();
			const c = new FormData(i),
				l = r?.getAttribute('name');
			l && c.append(l, r?.getAttribute('value') ?? ''),
				(o.search = new URLSearchParams(c).toString()),
				W({
					type: 'form',
					url: o,
					keepfocus: s.keepfocus,
					noscroll: s.noscroll,
					replace_state: s.replace_state ?? o.href === location.href
				});
		}),
		addEventListener('popstate', async (t) => {
			if (t.state?.[j]) {
				const n = t.state[j];
				if (((D = {}), n === w)) return;
				const r = T[n],
					a = t.state[Be] ?? {},
					o = new URL(t.state[Nt] ?? location.href),
					i = t.state[M],
					s = pe(location) === pe(m.url);
				if (i === S && (Ze || s)) {
					e(o),
						(T[w] = ke()),
						r && scrollTo(r.x, r.y),
						a !== k.state && ((k = { ...k, state: a }), x.$set({ page: k })),
						(w = n);
					return;
				}
				const l = n - w;
				await W({
					type: 'popstate',
					url: o,
					popped: { state: a, scroll: r, delta: l },
					accept: () => {
						(w = n), (S = i);
					},
					block: () => {
						history.go(-l);
					},
					nav_token: D
				});
			} else if (!V) {
				const n = new URL(location.href);
				e(n);
			}
		}),
		addEventListener('hashchange', () => {
			V && ((V = !1), Se.call(history, { ...history.state, [j]: ++w, [M]: S }, '', location.href));
		});
	for (const t of document.querySelectorAll('link')) t.rel === 'icon' && (t.href = t.href);
	addEventListener('pageshow', (t) => {
		t.persisted && L.navigating.set(null);
	});
	function e(t) {
		(m.url = t), L.page.set({ ...k, url: t }), L.page.notify();
	}
}
async function tn(
	e,
	{ status: t = 200, error: n, node_ids: r, params: a, route: o, data: i, form: s }
) {
	Le = !0;
	const c = new URL(location.href);
	({ params: a = {}, route: o = { id: null } } = ue(c, !1) || {});
	let l;
	try {
		const d = r.map(async (u, p) => {
				const h = i[p];
				return (
					h?.uses && (h.uses = it(h.uses)),
					Pe({
						loader: C.nodes[u],
						url: c,
						params: a,
						route: o,
						parent: async () => {
							const A = {};
							for (let E = 0; E < p; E += 1) Object.assign(A, (await d[E]).data);
							return A;
						},
						server_data_node: Ue(h)
					})
				);
			}),
			g = await Promise.all(d),
			f = se.find(({ id: u }) => u === o.id);
		if (f) {
			const u = f.layouts;
			for (let p = 0; p < u.length; p++) u[p] || g.splice(p, 0, void 0);
		}
		l = await K({ url: c, params: a, branch: g, status: t, error: n, form: s, route: f ?? null });
	} catch (d) {
		if (d instanceof We) {
			await $(new URL(d.location, location.href));
			return;
		}
		l = await le({
			status: Q(d),
			error: await z(d, { url: c, params: a, route: o }),
			url: c,
			route: o
		});
	}
	l.props.page && (l.props.page.state = {}), tt(l, e);
}
async function st(e, t) {
	const n = new URL(e);
	(n.pathname = _t(e.pathname)),
		e.pathname.endsWith('/') && n.searchParams.append(Bt, '1'),
		n.searchParams.append(Mt, t.map((a) => (a ? '1' : '0')).join(''));
	const r = await Fe(n.href);
	if (!r.ok) {
		let a;
		throw (
			(r.headers.get('content-type')?.includes('application/json')
				? (a = await r.json())
				: r.status === 404
					? (a = 'Not Found')
					: r.status === 500 && (a = 'Internal Error'),
			new oe(r.status, a))
		);
	}
	return new Promise(async (a) => {
		const o = new Map(),
			i = r.body.getReader(),
			s = new TextDecoder();
		function c(d) {
			return Je(d, {
				Promise: (g) =>
					new Promise((f, u) => {
						o.set(g, { fulfil: f, reject: u });
					})
			});
		}
		let l = '';
		for (;;) {
			const { done: d, value: g } = await i.read();
			if (d && !l) break;
			for (
				l +=
					!g && l
						? `
`
						: s.decode(g, { stream: !0 });
				;

			) {
				const f = l.indexOf(`
`);
				if (f === -1) break;
				const u = JSON.parse(l.slice(0, f));
				if (((l = l.slice(f + 1)), u.type === 'redirect')) return a(u);
				if (u.type === 'data')
					u.nodes?.forEach((p) => {
						p?.type === 'data' && ((p.uses = it(p.uses)), (p.data = c(p.data)));
					}),
						a(u);
				else if (u.type === 'chunk') {
					const { id: p, data: h, error: A } = u,
						E = o.get(p);
					o.delete(p), A ? E.reject(c(A)) : E.fulfil(c(h));
				}
			}
		}
	});
}
function it(e) {
	return {
		dependencies: new Set(e?.dependencies ?? []),
		params: new Set(e?.params ?? []),
		parent: !!e?.parent,
		route: !!e?.route,
		url: !!e?.url,
		search_params: new Set(e?.search_params ?? [])
	};
}
function be() {
	const e = document.querySelector('[autofocus]');
	if (e) e.focus();
	else {
		const t = document.body,
			n = t.getAttribute('tabindex');
		(t.tabIndex = -1),
			t.focus({ preventScroll: !0, focusVisible: !1 }),
			n !== null ? t.setAttribute('tabindex', n) : t.removeAttribute('tabindex');
		const r = getSelection();
		if (r && r.type !== 'None') {
			const a = [];
			for (let o = 0; o < r.rangeCount; o += 1) a.push(r.getRangeAt(o));
			setTimeout(() => {
				if (r.rangeCount === a.length) {
					for (let o = 0; o < r.rangeCount; o += 1) {
						const i = a[o],
							s = r.getRangeAt(o);
						if (
							i.commonAncestorContainer !== s.commonAncestorContainer ||
							i.startContainer !== s.startContainer ||
							i.endContainer !== s.endContainer ||
							i.startOffset !== s.startOffset ||
							i.endOffset !== s.endOffset
						)
							return;
					}
					r.removeAllRanges();
				}
			});
		}
	}
}
function ct(e, t, n, r) {
	let a, o;
	const i = new Promise((c, l) => {
		(a = c), (o = l);
	});
	return (
		i.catch(() => {}),
		{
			navigation: {
				from: { params: e.params, route: { id: e.route?.id ?? null }, url: e.url },
				to: n && { params: t?.params ?? null, route: { id: t?.route?.id ?? null }, url: n },
				willUnload: !t,
				type: r,
				complete: i
			},
			fulfil: a,
			reject: o
		}
	);
}
export { ln as a, sn as b, rn as d, an as g, cn as i, on as p, L as s, re as w };
