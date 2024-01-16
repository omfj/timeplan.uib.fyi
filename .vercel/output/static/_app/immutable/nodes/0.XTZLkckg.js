import {
	B as Tt,
	C as Ct,
	e as E,
	f as L,
	a as T,
	d as S,
	D as jt,
	j as M,
	E as Pt,
	F as xe,
	c as I,
	b as C,
	G as Ot,
	n as P,
	p as de,
	H as Et,
	s as k,
	A as Pe,
	v as Mt,
	o as Q,
	I as z,
	m as Oe,
	J as ge,
	k as rt,
	q as Lt,
	K as ot,
	i as J,
	L as Ee,
	r as Dt,
	M as He,
	x as ze,
	N as At
} from '../chunks/disclose-version.kdlgi_eV.js';
import {
	p as R,
	a as H,
	ag as st,
	j as U,
	k as h,
	v as D,
	m as O,
	ah as re,
	c as q,
	n as Ft,
	l as Be,
	b as ve,
	h as F,
	r as Y,
	u as Nt,
	e as pe,
	s as Rt
} from '../chunks/runtime.zBIj1Mfk.js';
import { e as Ht } from '../chunks/forms.XHf9R5Qw.js';
import { o as it, c as zt } from '../chunks/main-client.NR1UPAms.js';
import { n as Bt } from '../chunks/stores.tJ5HbWHB.js';
import { g as Vt, s as Qt } from '../chunks/user.svelte.VqRhIZH3.js';
import { d as Ut, g as we, w as at } from '../chunks/entry.WxN5ThT0.js';
var qt = S(
	'<li><a class="block px-4 py-1 rounded-full border-2 border-black font-bold hover:bg-gray-100"><!></a></li>'
);
function me(e, t) {
	H(t, !0);
	var n = L(e, !0, qt),
		o = T(n),
		r = T(o);
	Tt(() => t.children, r), Ct(o, 'href', () => t.href), E(e, n), R();
}
const Z = /^[a-z0-9]+(-[a-z0-9]+)*$/,
	ce = (e, t, n, o = '') => {
		const r = e.split(':');
		if (e.slice(0, 1) === '@') {
			if (r.length < 2 || r.length > 3) return null;
			o = r.shift().slice(1);
		}
		if (r.length > 3 || !r.length) return null;
		if (r.length > 1) {
			const a = r.pop(),
				l = r.pop(),
				c = { provider: r.length > 0 ? r[0] : o, prefix: l, name: a };
			return t && !oe(c) ? null : c;
		}
		const s = r[0],
			i = s.split('-');
		if (i.length > 1) {
			const a = { provider: o, prefix: i.shift(), name: i.join('-') };
			return t && !oe(a) ? null : a;
		}
		if (n && o === '') {
			const a = { provider: o, prefix: '', name: s };
			return t && !oe(a, n) ? null : a;
		}
		return null;
	},
	oe = (e, t) =>
		e
			? !!(
					(e.provider === '' || e.provider.match(Z)) &&
					((t && e.prefix === '') || e.prefix.match(Z)) &&
					e.name.match(Z)
				)
			: !1,
	lt = Object.freeze({ left: 0, top: 0, width: 16, height: 16 }),
	le = Object.freeze({ rotate: 0, vFlip: !1, hFlip: !1 }),
	ue = Object.freeze({ ...lt, ...le }),
	_e = Object.freeze({ ...ue, body: '', hidden: !1 });
function Wt(e, t) {
	const n = {};
	!e.hFlip != !t.hFlip && (n.hFlip = !0), !e.vFlip != !t.vFlip && (n.vFlip = !0);
	const o = ((e.rotate || 0) + (t.rotate || 0)) % 4;
	return o && (n.rotate = o), n;
}
function Ve(e, t) {
	const n = Wt(e, t);
	for (const o in _e)
		o in le
			? o in e && !(o in n) && (n[o] = le[o])
			: o in t
				? (n[o] = t[o])
				: o in e && (n[o] = e[o]);
	return n;
}
function Gt(e, t) {
	const n = e.icons,
		o = e.aliases || Object.create(null),
		r = Object.create(null);
	function s(i) {
		if (n[i]) return (r[i] = []);
		if (!(i in r)) {
			r[i] = null;
			const a = o[i] && o[i].parent,
				l = a && s(a);
			l && (r[i] = [a].concat(l));
		}
		return r[i];
	}
	return (t || Object.keys(n).concat(Object.keys(o))).forEach(s), r;
}
function Kt(e, t, n) {
	const o = e.icons,
		r = e.aliases || Object.create(null);
	let s = {};
	function i(a) {
		s = Ve(o[a] || r[a], s);
	}
	return i(t), n.forEach(i), Ve(e, s);
}
function ct(e, t) {
	const n = [];
	if (typeof e != 'object' || typeof e.icons != 'object') return n;
	e.not_found instanceof Array &&
		e.not_found.forEach((r) => {
			t(r, null), n.push(r);
		});
	const o = Gt(e);
	for (const r in o) {
		const s = o[r];
		s && (t(r, Kt(e, r, s)), n.push(r));
	}
	return n;
}
const Jt = { provider: '', aliases: {}, not_found: {}, ...lt };
function he(e, t) {
	for (const n in t) if (n in e && typeof e[n] != typeof t[n]) return !1;
	return !0;
}
function ut(e) {
	if (typeof e != 'object' || e === null) return null;
	const t = e;
	if (typeof t.prefix != 'string' || !e.icons || typeof e.icons != 'object' || !he(e, Jt))
		return null;
	const n = t.icons;
	for (const r in n) {
		const s = n[r];
		if (!r.match(Z) || typeof s.body != 'string' || !he(s, _e)) return null;
	}
	const o = t.aliases || Object.create(null);
	for (const r in o) {
		const s = o[r],
			i = s.parent;
		if (!r.match(Z) || typeof i != 'string' || (!n[i] && !o[i]) || !he(s, _e)) return null;
	}
	return t;
}
const Qe = Object.create(null);
function Yt(e, t) {
	return { provider: e, prefix: t, icons: Object.create(null), missing: new Set() };
}
function W(e, t) {
	const n = Qe[e] || (Qe[e] = Object.create(null));
	return n[t] || (n[t] = Yt(e, t));
}
function Me(e, t) {
	return ut(t)
		? ct(t, (n, o) => {
				o ? (e.icons[n] = o) : e.missing.add(n);
			})
		: [];
}
function Xt(e, t, n) {
	try {
		if (typeof n.body == 'string') return (e.icons[t] = { ...n }), !0;
	} catch {}
	return !1;
}
let $ = !1;
function ft(e) {
	return typeof e == 'boolean' && ($ = e), $;
}
function Zt(e) {
	const t = typeof e == 'string' ? ce(e, !0, $) : e;
	if (t) {
		const n = W(t.provider, t.prefix),
			o = t.name;
		return n.icons[o] || (n.missing.has(o) ? null : void 0);
	}
}
function $t(e, t) {
	const n = ce(e, !0, $);
	if (!n) return !1;
	const o = W(n.provider, n.prefix);
	return Xt(o, n.name, t);
}
function en(e, t) {
	if (typeof e != 'object') return !1;
	if ((typeof t != 'string' && (t = e.provider || ''), $ && !t && !e.prefix)) {
		let r = !1;
		return (
			ut(e) &&
				((e.prefix = ''),
				ct(e, (s, i) => {
					i && $t(s, i) && (r = !0);
				})),
			r
		);
	}
	const n = e.prefix;
	if (!oe({ provider: t, prefix: n, name: 'a' })) return !1;
	const o = W(t, n);
	return !!Me(o, e);
}
const dt = Object.freeze({ width: null, height: null }),
	gt = Object.freeze({ ...dt, ...le }),
	tn = /(-?[0-9.]*[0-9]+[0-9.]*)/g,
	nn = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function Ue(e, t, n) {
	if (t === 1) return e;
	if (((n = n || 100), typeof e == 'number')) return Math.ceil(e * t * n) / n;
	if (typeof e != 'string') return e;
	const o = e.split(tn);
	if (o === null || !o.length) return e;
	const r = [];
	let s = o.shift(),
		i = nn.test(s);
	for (;;) {
		if (i) {
			const a = parseFloat(s);
			isNaN(a) ? r.push(s) : r.push(Math.ceil(a * t * n) / n);
		} else r.push(s);
		if (((s = o.shift()), s === void 0)) return r.join('');
		i = !i;
	}
}
function rn(e, t = 'defs') {
	let n = '';
	const o = e.indexOf('<' + t);
	for (; o >= 0; ) {
		const r = e.indexOf('>', o),
			s = e.indexOf('</' + t);
		if (r === -1 || s === -1) break;
		const i = e.indexOf('>', s);
		if (i === -1) break;
		(n += e.slice(r + 1, s).trim()), (e = e.slice(0, o).trim() + e.slice(i + 1));
	}
	return { defs: n, content: e };
}
function on(e, t) {
	return e ? '<defs>' + e + '</defs>' + t : t;
}
function sn(e, t, n) {
	const o = rn(e);
	return on(o.defs, t + o.content + n);
}
const an = (e) => e === 'unset' || e === 'undefined' || e === 'none';
function ln(e, t) {
	const n = { ...ue, ...e },
		o = { ...gt, ...t },
		r = { left: n.left, top: n.top, width: n.width, height: n.height };
	let s = n.body;
	[n, o].forEach((m) => {
		const y = [],
			g = m.hFlip,
			d = m.vFlip;
		let _ = m.rotate;
		g
			? d
				? (_ += 2)
				: (y.push(
						'translate(' + (r.width + r.left).toString() + ' ' + (0 - r.top).toString() + ')'
					),
					y.push('scale(-1 1)'),
					(r.top = r.left = 0))
			: d &&
				(y.push('translate(' + (0 - r.left).toString() + ' ' + (r.height + r.top).toString() + ')'),
				y.push('scale(1 -1)'),
				(r.top = r.left = 0));
		let w;
		switch ((_ < 0 && (_ -= Math.floor(_ / 4) * 4), (_ = _ % 4), _)) {
			case 1:
				(w = r.height / 2 + r.top),
					y.unshift('rotate(90 ' + w.toString() + ' ' + w.toString() + ')');
				break;
			case 2:
				y.unshift(
					'rotate(180 ' +
						(r.width / 2 + r.left).toString() +
						' ' +
						(r.height / 2 + r.top).toString() +
						')'
				);
				break;
			case 3:
				(w = r.width / 2 + r.left),
					y.unshift('rotate(-90 ' + w.toString() + ' ' + w.toString() + ')');
				break;
		}
		_ % 2 === 1 &&
			(r.left !== r.top && ((w = r.left), (r.left = r.top), (r.top = w)),
			r.width !== r.height && ((w = r.width), (r.width = r.height), (r.height = w))),
			y.length && (s = sn(s, '<g transform="' + y.join(' ') + '">', '</g>'));
	});
	const i = o.width,
		a = o.height,
		l = r.width,
		c = r.height;
	let u, f;
	i === null
		? ((f = a === null ? '1em' : a === 'auto' ? c : a), (u = Ue(f, l / c)))
		: ((u = i === 'auto' ? l : i), (f = a === null ? Ue(u, c / l) : a === 'auto' ? c : a));
	const v = {},
		b = (m, y) => {
			an(y) || (v[m] = y.toString());
		};
	b('width', u), b('height', f);
	const p = [r.left, r.top, l, c];
	return (v.viewBox = p.join(' ')), { attributes: v, viewBox: p, body: s };
}
const cn = /\sid="(\S+)"/g,
	un = 'IconifyId' + Date.now().toString(16) + ((Math.random() * 16777216) | 0).toString(16);
let fn = 0;
function dn(e, t = un) {
	const n = [];
	let o;
	for (; (o = cn.exec(e)); ) n.push(o[1]);
	if (!n.length) return e;
	const r = 'suffix' + ((Math.random() * 16777216) | Date.now()).toString(16);
	return (
		n.forEach((s) => {
			const i = typeof t == 'function' ? t(s) : t + (fn++).toString(),
				a = s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
			e = e.replace(new RegExp('([#;"])(' + a + ')([")]|\\.[a-z])', 'g'), '$1' + i + r + '$3');
		}),
		(e = e.replace(new RegExp(r, 'g'), '')),
		e
	);
}
const ke = Object.create(null);
function gn(e, t) {
	ke[e] = t;
}
function Ie(e) {
	return ke[e] || ke[''];
}
function Le(e) {
	let t;
	if (typeof e.resources == 'string') t = [e.resources];
	else if (((t = e.resources), !(t instanceof Array) || !t.length)) return null;
	return {
		resources: t,
		path: e.path || '/',
		maxURL: e.maxURL || 500,
		rotate: e.rotate || 750,
		timeout: e.timeout || 5e3,
		random: e.random === !0,
		index: e.index || 0,
		dataAfterTimeout: e.dataAfterTimeout !== !1
	};
}
const De = Object.create(null),
	X = ['https://api.simplesvg.com', 'https://api.unisvg.com'],
	se = [];
for (; X.length > 0; )
	X.length === 1 || Math.random() > 0.5 ? se.push(X.shift()) : se.push(X.pop());
De[''] = Le({ resources: ['https://api.iconify.design'].concat(se) });
function vn(e, t) {
	const n = Le(t);
	return n === null ? !1 : ((De[e] = n), !0);
}
function Ae(e) {
	return De[e];
}
const pn = () => {
	let e;
	try {
		if (((e = fetch), typeof e == 'function')) return e;
	} catch {}
};
let qe = pn();
function mn(e, t) {
	const n = Ae(e);
	if (!n) return 0;
	let o;
	if (!n.maxURL) o = 0;
	else {
		let r = 0;
		n.resources.forEach((i) => {
			r = Math.max(r, i.length);
		});
		const s = t + '.json?icons=';
		o = n.maxURL - r - n.path.length - s.length;
	}
	return o;
}
function hn(e) {
	return e === 404;
}
const yn = (e, t, n) => {
	const o = [],
		r = mn(e, t),
		s = 'icons';
	let i = { type: s, provider: e, prefix: t, icons: [] },
		a = 0;
	return (
		n.forEach((l, c) => {
			(a += l.length + 1),
				a >= r &&
					c > 0 &&
					(o.push(i), (i = { type: s, provider: e, prefix: t, icons: [] }), (a = l.length)),
				i.icons.push(l);
		}),
		o.push(i),
		o
	);
};
function bn(e) {
	if (typeof e == 'string') {
		const t = Ae(e);
		if (t) return t.path;
	}
	return '/';
}
const xn = (e, t, n) => {
		if (!qe) {
			n('abort', 424);
			return;
		}
		let o = bn(t.provider);
		switch (t.type) {
			case 'icons': {
				const s = t.prefix,
					a = t.icons.join(','),
					l = new URLSearchParams({ icons: a });
				o += s + '.json?' + l.toString();
				break;
			}
			case 'custom': {
				const s = t.uri;
				o += s.slice(0, 1) === '/' ? s.slice(1) : s;
				break;
			}
			default:
				n('abort', 400);
				return;
		}
		let r = 503;
		qe(e + o)
			.then((s) => {
				const i = s.status;
				if (i !== 200) {
					setTimeout(() => {
						n(hn(i) ? 'abort' : 'next', i);
					});
					return;
				}
				return (r = 501), s.json();
			})
			.then((s) => {
				if (typeof s != 'object' || s === null) {
					setTimeout(() => {
						s === 404 ? n('abort', s) : n('next', r);
					});
					return;
				}
				setTimeout(() => {
					n('success', s);
				});
			})
			.catch(() => {
				n('next', r);
			});
	},
	wn = { prepare: yn, send: xn };
function _n(e) {
	const t = { loaded: [], missing: [], pending: [] },
		n = Object.create(null);
	e.sort((r, s) =>
		r.provider !== s.provider
			? r.provider.localeCompare(s.provider)
			: r.prefix !== s.prefix
				? r.prefix.localeCompare(s.prefix)
				: r.name.localeCompare(s.name)
	);
	let o = { provider: '', prefix: '', name: '' };
	return (
		e.forEach((r) => {
			if (o.name === r.name && o.prefix === r.prefix && o.provider === r.provider) return;
			o = r;
			const s = r.provider,
				i = r.prefix,
				a = r.name,
				l = n[s] || (n[s] = Object.create(null)),
				c = l[i] || (l[i] = W(s, i));
			let u;
			a in c.icons
				? (u = t.loaded)
				: i === '' || c.missing.has(a)
					? (u = t.missing)
					: (u = t.pending);
			const f = { provider: s, prefix: i, name: a };
			u.push(f);
		}),
		t
	);
}
function vt(e, t) {
	e.forEach((n) => {
		const o = n.loaderCallbacks;
		o && (n.loaderCallbacks = o.filter((r) => r.id !== t));
	});
}
function kn(e) {
	e.pendingCallbacksFlag ||
		((e.pendingCallbacksFlag = !0),
		setTimeout(() => {
			e.pendingCallbacksFlag = !1;
			const t = e.loaderCallbacks ? e.loaderCallbacks.slice(0) : [];
			if (!t.length) return;
			let n = !1;
			const o = e.provider,
				r = e.prefix;
			t.forEach((s) => {
				const i = s.icons,
					a = i.pending.length;
				(i.pending = i.pending.filter((l) => {
					if (l.prefix !== r) return !0;
					const c = l.name;
					if (e.icons[c]) i.loaded.push({ provider: o, prefix: r, name: c });
					else if (e.missing.has(c)) i.missing.push({ provider: o, prefix: r, name: c });
					else return (n = !0), !0;
					return !1;
				})),
					i.pending.length !== a &&
						(n || vt([e], s.id),
						s.callback(i.loaded.slice(0), i.missing.slice(0), i.pending.slice(0), s.abort));
			});
		}));
}
let In = 0;
function Sn(e, t, n) {
	const o = In++,
		r = vt.bind(null, n, o);
	if (!t.pending.length) return r;
	const s = { id: o, icons: t, callback: e, abort: r };
	return (
		n.forEach((i) => {
			(i.loaderCallbacks || (i.loaderCallbacks = [])).push(s);
		}),
		r
	);
}
function Tn(e, t = !0, n = !1) {
	const o = [];
	return (
		e.forEach((r) => {
			const s = typeof r == 'string' ? ce(r, t, n) : r;
			s && o.push(s);
		}),
		o
	);
}
var Cn = { resources: [], index: 0, timeout: 2e3, rotate: 750, random: !1, dataAfterTimeout: !1 };
function jn(e, t, n, o) {
	const r = e.resources.length,
		s = e.random ? Math.floor(Math.random() * r) : e.index;
	let i;
	if (e.random) {
		let x = e.resources.slice(0);
		for (i = []; x.length > 1; ) {
			const j = Math.floor(Math.random() * x.length);
			i.push(x[j]), (x = x.slice(0, j).concat(x.slice(j + 1)));
		}
		i = i.concat(x);
	} else i = e.resources.slice(s).concat(e.resources.slice(0, s));
	const a = Date.now();
	let l = 'pending',
		c = 0,
		u,
		f = null,
		v = [],
		b = [];
	typeof o == 'function' && b.push(o);
	function p() {
		f && (clearTimeout(f), (f = null));
	}
	function m() {
		l === 'pending' && (l = 'aborted'),
			p(),
			v.forEach((x) => {
				x.status === 'pending' && (x.status = 'aborted');
			}),
			(v = []);
	}
	function y(x, j) {
		j && (b = []), typeof x == 'function' && b.push(x);
	}
	function g() {
		return {
			startTime: a,
			payload: t,
			status: l,
			queriesSent: c,
			queriesPending: v.length,
			subscribe: y,
			abort: m
		};
	}
	function d() {
		(l = 'failed'),
			b.forEach((x) => {
				x(void 0, u);
			});
	}
	function _() {
		v.forEach((x) => {
			x.status === 'pending' && (x.status = 'aborted');
		}),
			(v = []);
	}
	function w(x, j, N) {
		const K = j !== 'success';
		switch (((v = v.filter((V) => V !== x)), l)) {
			case 'pending':
				break;
			case 'failed':
				if (K || !e.dataAfterTimeout) return;
				break;
			default:
				return;
		}
		if (j === 'abort') {
			(u = N), d();
			return;
		}
		if (K) {
			(u = N), v.length || (i.length ? A() : d());
			return;
		}
		if ((p(), _(), !e.random)) {
			const V = e.resources.indexOf(x.resource);
			V !== -1 && V !== e.index && (e.index = V);
		}
		(l = 'completed'),
			b.forEach((V) => {
				V(N);
			});
	}
	function A() {
		if (l !== 'pending') return;
		p();
		const x = i.shift();
		if (x === void 0) {
			if (v.length) {
				f = setTimeout(() => {
					p(), l === 'pending' && (_(), d());
				}, e.timeout);
				return;
			}
			d();
			return;
		}
		const j = {
			status: 'pending',
			resource: x,
			callback: (N, K) => {
				w(j, N, K);
			}
		};
		v.push(j), c++, (f = setTimeout(A, e.rotate)), n(x, t, j.callback);
	}
	return setTimeout(A), g;
}
function pt(e) {
	const t = { ...Cn, ...e };
	let n = [];
	function o() {
		n = n.filter((a) => a().status === 'pending');
	}
	function r(a, l, c) {
		const u = jn(t, a, l, (f, v) => {
			o(), c && c(f, v);
		});
		return n.push(u), u;
	}
	function s(a) {
		return n.find((l) => a(l)) || null;
	}
	return {
		query: r,
		find: s,
		setIndex: (a) => {
			t.index = a;
		},
		getIndex: () => t.index,
		cleanup: o
	};
}
function We() {}
const ye = Object.create(null);
function Pn(e) {
	if (!ye[e]) {
		const t = Ae(e);
		if (!t) return;
		const n = pt(t),
			o = { config: t, redundancy: n };
		ye[e] = o;
	}
	return ye[e];
}
function On(e, t, n) {
	let o, r;
	if (typeof e == 'string') {
		const s = Ie(e);
		if (!s) return n(void 0, 424), We;
		r = s.send;
		const i = Pn(e);
		i && (o = i.redundancy);
	} else {
		const s = Le(e);
		if (s) {
			o = pt(s);
			const i = e.resources ? e.resources[0] : '',
				a = Ie(i);
			a && (r = a.send);
		}
	}
	return !o || !r ? (n(void 0, 424), We) : o.query(t, r, n)().abort;
}
const Ge = 'iconify2',
	ee = 'iconify',
	mt = ee + '-count',
	Ke = ee + '-version',
	ht = 36e5,
	En = 168,
	Mn = 50;
function Se(e, t) {
	try {
		return e.getItem(t);
	} catch {}
}
function Fe(e, t, n) {
	try {
		return e.setItem(t, n), !0;
	} catch {}
}
function Je(e, t) {
	try {
		e.removeItem(t);
	} catch {}
}
function Te(e, t) {
	return Fe(e, mt, t.toString());
}
function Ce(e) {
	return parseInt(Se(e, mt)) || 0;
}
const fe = { local: !0, session: !0 },
	yt = { local: new Set(), session: new Set() };
let Ne = !1;
function Ln(e) {
	Ne = e;
}
let ne = typeof window > 'u' ? {} : window;
function bt(e) {
	const t = e + 'Storage';
	try {
		if (ne && ne[t] && typeof ne[t].length == 'number') return ne[t];
	} catch {}
	fe[e] = !1;
}
function xt(e, t) {
	const n = bt(e);
	if (!n) return;
	const o = Se(n, Ke);
	if (o !== Ge) {
		if (o) {
			const a = Ce(n);
			for (let l = 0; l < a; l++) Je(n, ee + l.toString());
		}
		Fe(n, Ke, Ge), Te(n, 0);
		return;
	}
	const r = Math.floor(Date.now() / ht) - En,
		s = (a) => {
			const l = ee + a.toString(),
				c = Se(n, l);
			if (typeof c == 'string') {
				try {
					const u = JSON.parse(c);
					if (
						typeof u == 'object' &&
						typeof u.cached == 'number' &&
						u.cached > r &&
						typeof u.provider == 'string' &&
						typeof u.data == 'object' &&
						typeof u.data.prefix == 'string' &&
						t(u, a)
					)
						return !0;
				} catch {}
				Je(n, l);
			}
		};
	let i = Ce(n);
	for (let a = i - 1; a >= 0; a--) s(a) || (a === i - 1 ? (i--, Te(n, i)) : yt[e].add(a));
}
function wt() {
	if (!Ne) {
		Ln(!0);
		for (const e in fe)
			xt(e, (t) => {
				const n = t.data,
					o = t.provider,
					r = n.prefix,
					s = W(o, r);
				if (!Me(s, n).length) return !1;
				const i = n.lastModified || -1;
				return (
					(s.lastModifiedCached = s.lastModifiedCached ? Math.min(s.lastModifiedCached, i) : i), !0
				);
			});
	}
}
function Dn(e, t) {
	const n = e.lastModifiedCached;
	if (n && n >= t) return n === t;
	if (((e.lastModifiedCached = t), n))
		for (const o in fe)
			xt(o, (r) => {
				const s = r.data;
				return r.provider !== e.provider || s.prefix !== e.prefix || s.lastModified === t;
			});
	return !0;
}
function An(e, t) {
	Ne || wt();
	function n(o) {
		let r;
		if (!fe[o] || !(r = bt(o))) return;
		const s = yt[o];
		let i;
		if (s.size) s.delete((i = Array.from(s).shift()));
		else if (((i = Ce(r)), i >= Mn || !Te(r, i + 1))) return;
		const a = { cached: Math.floor(Date.now() / ht), provider: e.provider, data: t };
		return Fe(r, ee + i.toString(), JSON.stringify(a));
	}
	(t.lastModified && !Dn(e, t.lastModified)) ||
		(Object.keys(t.icons).length &&
			(t.not_found && ((t = Object.assign({}, t)), delete t.not_found),
			n('local') || n('session')));
}
function Ye() {}
function Fn(e) {
	e.iconsLoaderFlag ||
		((e.iconsLoaderFlag = !0),
		setTimeout(() => {
			(e.iconsLoaderFlag = !1), kn(e);
		}));
}
function Nn(e, t) {
	e.iconsToLoad ? (e.iconsToLoad = e.iconsToLoad.concat(t).sort()) : (e.iconsToLoad = t),
		e.iconsQueueFlag ||
			((e.iconsQueueFlag = !0),
			setTimeout(() => {
				e.iconsQueueFlag = !1;
				const { provider: n, prefix: o } = e,
					r = e.iconsToLoad;
				delete e.iconsToLoad;
				let s;
				if (!r || !(s = Ie(n))) return;
				s.prepare(n, o, r).forEach((a) => {
					On(n, a, (l) => {
						if (typeof l != 'object')
							a.icons.forEach((c) => {
								e.missing.add(c);
							});
						else
							try {
								const c = Me(e, l);
								if (!c.length) return;
								const u = e.pendingIcons;
								u &&
									c.forEach((f) => {
										u.delete(f);
									}),
									An(e, l);
							} catch (c) {
								console.error(c);
							}
						Fn(e);
					});
				});
			}));
}
const Rn = (e, t) => {
	const n = Tn(e, !0, ft()),
		o = _n(n);
	if (!o.pending.length) {
		let l = !0;
		return (
			t &&
				setTimeout(() => {
					l && t(o.loaded, o.missing, o.pending, Ye);
				}),
			() => {
				l = !1;
			}
		);
	}
	const r = Object.create(null),
		s = [];
	let i, a;
	return (
		o.pending.forEach((l) => {
			const { provider: c, prefix: u } = l;
			if (u === a && c === i) return;
			(i = c), (a = u), s.push(W(c, u));
			const f = r[c] || (r[c] = Object.create(null));
			f[u] || (f[u] = []);
		}),
		o.pending.forEach((l) => {
			const { provider: c, prefix: u, name: f } = l,
				v = W(c, u),
				b = v.pendingIcons || (v.pendingIcons = new Set());
			b.has(f) || (b.add(f), r[c][u].push(f));
		}),
		s.forEach((l) => {
			const { provider: c, prefix: u } = l;
			r[c][u].length && Nn(l, r[c][u]);
		}),
		t ? Sn(t, o, s) : Ye
	);
};
function Hn(e, t) {
	const n = { ...e };
	for (const o in t) {
		const r = t[o],
			s = typeof r;
		o in dt
			? (r === null || (r && (s === 'string' || s === 'number'))) && (n[o] = r)
			: s === typeof n[o] && (n[o] = o === 'rotate' ? r % 4 : r);
	}
	return n;
}
const zn = /[\s,]+/;
function Bn(e, t) {
	t.split(zn).forEach((n) => {
		switch (n.trim()) {
			case 'horizontal':
				e.hFlip = !0;
				break;
			case 'vertical':
				e.vFlip = !0;
				break;
		}
	});
}
function Vn(e, t = 0) {
	const n = e.replace(/^-?[0-9.]*/, '');
	function o(r) {
		for (; r < 0; ) r += 4;
		return r % 4;
	}
	if (n === '') {
		const r = parseInt(e);
		return isNaN(r) ? 0 : o(r);
	} else if (n !== e) {
		let r = 0;
		switch (n) {
			case '%':
				r = 25;
				break;
			case 'deg':
				r = 90;
		}
		if (r) {
			let s = parseFloat(e.slice(0, e.length - n.length));
			return isNaN(s) ? 0 : ((s = s / r), s % 1 === 0 ? o(s) : 0);
		}
	}
	return t;
}
function Qn(e, t) {
	let n = e.indexOf('xlink:') === -1 ? '' : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
	for (const o in t) n += ' ' + o + '="' + t[o] + '"';
	return '<svg xmlns="http://www.w3.org/2000/svg"' + n + '>' + e + '</svg>';
}
function Un(e) {
	return e
		.replace(/"/g, "'")
		.replace(/%/g, '%25')
		.replace(/#/g, '%23')
		.replace(/</g, '%3C')
		.replace(/>/g, '%3E')
		.replace(/\s+/g, ' ');
}
function qn(e) {
	return 'data:image/svg+xml,' + Un(e);
}
function Wn(e) {
	return 'url("' + qn(e) + '")';
}
const Xe = { ...gt, inline: !1 },
	Gn = {
		xmlns: 'http://www.w3.org/2000/svg',
		'xmlns:xlink': 'http://www.w3.org/1999/xlink',
		'aria-hidden': !0,
		role: 'img'
	},
	Kn = { display: 'inline-block' },
	je = { 'background-color': 'currentColor' },
	_t = { 'background-color': 'transparent' },
	Ze = { image: 'var(--svg)', repeat: 'no-repeat', size: '100% 100%' },
	$e = { '-webkit-mask': je, mask: je, background: _t };
for (const e in $e) {
	const t = $e[e];
	for (const n in Ze) t[e + '-' + n] = Ze[n];
}
function Jn(e) {
	return e + (e.match(/^[-0-9.]+$/) ? 'px' : '');
}
function Yn(e, t) {
	const n = Hn(Xe, t),
		o = t.mode || 'svg',
		r = o === 'svg' ? { ...Gn } : {};
	e.body.indexOf('xlink:') === -1 && delete r['xmlns:xlink'];
	let s = typeof t.style == 'string' ? t.style : '';
	for (let g in t) {
		const d = t[g];
		if (d !== void 0)
			switch (g) {
				case 'icon':
				case 'style':
				case 'onLoad':
				case 'mode':
					break;
				case 'inline':
				case 'hFlip':
				case 'vFlip':
					n[g] = d === !0 || d === 'true' || d === 1;
					break;
				case 'flip':
					typeof d == 'string' && Bn(n, d);
					break;
				case 'color':
					s = s + (s.length > 0 && s.trim().slice(-1) !== ';' ? ';' : '') + 'color: ' + d + '; ';
					break;
				case 'rotate':
					typeof d == 'string' ? (n[g] = Vn(d)) : typeof d == 'number' && (n[g] = d);
					break;
				case 'ariaHidden':
				case 'aria-hidden':
					d !== !0 && d !== 'true' && delete r['aria-hidden'];
					break;
				default:
					if (g.slice(0, 3) === 'on:') break;
					Xe[g] === void 0 && (r[g] = d);
			}
	}
	const i = ln(e, n),
		a = i.attributes;
	if ((n.inline && (s = 'vertical-align: -0.125em; ' + s), o === 'svg')) {
		Object.assign(r, a), s !== '' && (r.style = s);
		let g = 0,
			d = t.id;
		return (
			typeof d == 'string' && (d = d.replace(/-/g, '_')),
			{ svg: !0, attributes: r, body: dn(i.body, d ? () => d + 'ID' + g++ : 'iconifySvelte') }
		);
	}
	const { body: l, width: c, height: u } = e,
		f = o === 'mask' || (o === 'bg' ? !1 : l.indexOf('currentColor') !== -1),
		v = Qn(l, { ...a, width: c + '', height: u + '' }),
		p = { '--svg': Wn(v) },
		m = (g) => {
			const d = a[g];
			d && (p[g] = Jn(d));
		};
	m('width'), m('height'), Object.assign(p, Kn, f ? je : _t);
	let y = '';
	for (const g in p) y += g + ': ' + p[g] + ';';
	return (r.style = y + s), { svg: !1, attributes: r };
}
ft(!0);
gn('', wn);
if (typeof document < 'u' && typeof window < 'u') {
	wt();
	const e = window;
	if (e.IconifyPreload !== void 0) {
		const t = e.IconifyPreload,
			n = 'Invalid IconifyPreload syntax.';
		typeof t == 'object' &&
			t !== null &&
			(t instanceof Array ? t : [t]).forEach((o) => {
				try {
					(typeof o != 'object' ||
						o === null ||
						o instanceof Array ||
						typeof o.icons != 'object' ||
						typeof o.prefix != 'string' ||
						!en(o)) &&
						console.error(n);
				} catch {
					console.error(n);
				}
			});
	}
	if (e.IconifyProviders !== void 0) {
		const t = e.IconifyProviders;
		if (typeof t == 'object' && t !== null)
			for (let n in t) {
				const o = 'IconifyProviders[' + n + '] is invalid.';
				try {
					const r = t[n];
					if (typeof r != 'object' || !r || r.resources === void 0) continue;
					vn(n, r) || console.error(o);
				} catch {
					console.error(o);
				}
			}
	}
}
function Xn(e, t, n, o, r) {
	function s() {
		t.loading && (t.loading.abort(), (t.loading = null));
	}
	if (typeof e == 'object' && e !== null && typeof e.body == 'string')
		return (t.name = ''), s(), { data: { ...ue, ...e } };
	let i;
	if (typeof e != 'string' || (i = ce(e, !1, !0)) === null) return s(), null;
	const a = Zt(i);
	if (!a)
		return (
			n &&
				(!t.loading || t.loading.name !== e) &&
				(s(), (t.name = ''), (t.loading = { name: e, abort: Rn([i], o) })),
			null
		);
	s(), t.name !== e && ((t.name = e), r && !t.destroyed && r(e));
	const l = ['iconify'];
	return (
		i.prefix !== '' && l.push('iconify--' + i.prefix),
		i.provider !== '' && l.push('iconify--' + i.provider),
		{ data: a, classes: l }
	);
}
function Zn(e, t) {
	return e ? Yn({ ...ue, ...e }, t) : null;
}
var $n = S('<svg><!></svg>'),
	er = S('<span></span>');
function et(e, t) {
	const n = jt(t, ['children', '$$slots', '$$events']);
	H(t, !1);
	const o = D({ name: '', loading: null, destroyed: !1 });
	let r = D(!1),
		s = D(0),
		i = D();
	const a = (f) => {
		typeof n.onLoad == 'function' && n.onLoad(f), zt()('load', { icon: f });
	};
	function l() {
		Ft(s);
	}
	it(() => {
		O(r, !0);
	}),
		st(() => {
			re(o, (h(o).destroyed = !0)),
				h(o).loading && (h(o).loading.abort(), re(o, (h(o).loading = null)));
		}),
		U(() => {
			h(s),
				Ot(t),
				h(o),
				h(r),
				h(i),
				q(() => {
					h(s);
					const f = Xn(n.icon, h(o), h(r), l, a);
					O(i, f ? Zn(f.data, n) : null),
						h(i) &&
							f.classes &&
							re(
								i,
								(h(i).attributes.class =
									(typeof n.class == 'string' ? n.class + ' ' : '') + f.classes.join(' '))
							);
				});
		});
	var c = P(e),
		u = C(c);
	M(
		u,
		() => h(i),
		(f) => {
			var v = P(f),
				b = C(v);
			M(
				b,
				() => h(i).svg,
				(p) => {
					var m = L(p, !0, $n),
						y = T(m);
					Pt(y, () => h(i).body, !0), xe(m, () => [h(i).attributes], !1, ''), E(p, m);
				},
				(p) => {
					var m = L(p, !0, er);
					xe(m, () => [h(i).attributes], !0, ''), E(p, m);
				}
			),
				I(f, v);
		},
		null
	),
		I(e, c),
		R();
}
const tr = 768;
function nr() {
	let e = Be(!1),
		t = Be(de(window.innerWidth));
	return (
		ve(() => {
			const n = () => {
				O(t, de(window.innerWidth));
			};
			return (
				window.addEventListener('resize', n),
				() => {
					window.removeEventListener('resize', n);
				}
			);
		}),
		ve(() => {
			Bt && O(e, !1);
		}),
		ve(() => {
			h(t) && h(t) >= tr && O(e, !1);
		}),
		{
			get isOpen() {
				return h(e);
			},
			set isOpen(n) {
				O(e, de(n));
			},
			toggle() {
				O(e, !h(e));
			}
		}
	);
}
var rr = (e, t) => re(t, (h(t).isOpen = !1)),
	or = S('<div class="fixed inset-0 bg-black/20 bg-opacity-50 backdrop-blur-sm z-30"></div>'),
	sr = S('Min profil', !0),
	ir = S('Logg ut', !0),
	ar = S('<!> <li><!></li>', !0),
	lr = S('Logg inn', !0),
	cr = S(
		'<li><a href="/login" class="text-xl font-black hover:underline">Logg inn</a></li> <li><a href="/register" class="text-xl font-black hover:underline">Registrer deg</a></li>',
		!0
	),
	ur = S(
		'<li><form action="/logout" method="post"><button class="text-xl font-black hover:underline">Logg ut</button></form></li>'
	),
	fr = S(
		'<nav class="py-4"><ul class="flex flex-col gap-2"><li><a href="/" class="text-xl font-black hover:underline">Hjem</a></li> <!> <!></ul></nav>'
	),
	dr = S(
		'<!> <div class="p-4 sticky z-40 top-0"><header class="flex flex-col max-w-4xl w-full mx-auto border-2 border-black rounded-[36px] px-8 py-2 bg-white"><div class="flex items-center justify-between"><a href="/"><h1 class="text-3xl font-black py-2 hover:underline">Timeplan</h1></a> <nav class="hidden md:block ml-5"><ul class="flex gap-2"><!> <!></ul></nav> <button class="block md:hidden border-2 border-black rounded-full p-1"><!></button></div> <!></header></div>',
		!0
	);
function gr(e, t) {
	H(t, !1);
	let n = D(nr()),
		o = Vt();
	var r = Q(e, !0, dr),
		s = C(r),
		i = k(k(s)),
		a = T(i),
		l = T(a),
		c = T(l),
		u = k(k(c)),
		f = T(u),
		v = T(f),
		b = k(k(v)),
		p = k(k(u)),
		m = T(p),
		y = k(k(l));
	M(
		s,
		() => h(n).isOpen,
		(g) => {
			var d = L(g, !0, or);
			Pe(d, 'aria-hidden', !0), (d.__click = [rr, n]), E(g, d);
		},
		null
	),
		M(
			v,
			() => o,
			(g) => {
				var d = Q(g, !0, ar),
					_ = C(d),
					w = k(k(_)),
					A = T(w);
				me(_, {
					href: '/profile',
					children: (x, j) => {
						var N = Q(x, !0, sr);
						I(x, N);
					}
				}),
					me(A, {
						href: '/api/auth/logout',
						children: (x, j) => {
							var N = Q(x, !0, ir);
							I(x, N);
						}
					}),
					I(g, d);
			},
			null
		),
		M(
			b,
			() => !o,
			(g) => {
				var d = P(g),
					_ = C(d);
				me(_, {
					href: '/logg-inn',
					children: (w, A) => {
						var x = Q(w, !0, lr);
						I(w, x);
					}
				}),
					I(g, d);
			},
			null
		),
		(p.__click = function (...g) {
			return h(n).toggle?.apply(this, g);
		}),
		M(
			m,
			() => h(n).isOpen,
			(g) => {
				var d = P(g),
					_ = C(d);
				et(_, { icon: 'mdi:close', class: 'w-6 h-6 font-bold' }), I(g, d);
			},
			(g) => {
				var d = P(g),
					_ = C(d);
				et(_, { icon: 'mdi:menu', class: 'w-6 h-6 font-bold' }), I(g, d);
			}
		),
		M(
			y,
			() => h(n).isOpen,
			(g) => {
				var d = L(g, !0, fr),
					_ = T(d),
					w = T(_),
					A = k(k(w)),
					x = k(k(A));
				M(
					A,
					() => !o,
					(j) => {
						var N = Q(j, !0, cr);
						I(j, N);
					},
					null
				),
					M(
						x,
						() => o,
						(j) => {
							var N = L(j, !0, ur),
								K = T(N);
							Mt(K, (V) => Ht(V)), E(j, N);
						},
						null
					),
					E(g, d);
			},
			null
		),
		I(e, r),
		R();
}
Et(['click']);
function vr(e, t, n, o) {
	var r,
		s,
		i = !1,
		a = n.length >= 2,
		l = (p, m, y) => {
			if (((r = m), a && (s = p), !i)) {
				let g = t(p, m, y);
				if (t.length < 2) m(g);
				else return g;
			}
			i = !1;
		},
		c = Ut(e, l, o),
		u = !Array.isArray(e);
	function f(p) {
		var m = n(p, s);
		u
			? ((i = !0), e.set(m))
			: m.forEach((y, g) => {
					(i = !0), e[g].set(y);
				}),
			(i = !1);
	}
	var v = !1;
	function b(p) {
		var m, y, g, d;
		if (v) {
			(d = p(we(c))), r(d);
			return;
		}
		var _ = c.subscribe((w) => {
			v ? (m ? (y = !0) : (m = !0)) : (g = w);
		});
		(d = p(g)), (v = !0), r(d), _(), (v = !1), y && (d = we(c)), m && f(d);
	}
	return {
		subscribe: c.subscribe,
		set(p) {
			b(() => p);
		},
		update: b
	};
}
const pr = 20,
	G = at([]),
	Re = at(null),
	ie = new Map(),
	tt = (e) => {
		if (ie.has(e)) return;
		const t = setTimeout(() => {
			ie.delete(e), It(e);
		}, 1e3);
		ie.set(e, t);
	},
	mr = (e) => {
		const t = ie.get(e);
		t && clearTimeout(t);
	};
function kt(e) {
	e.id && mr(e.id), G.update((t) => t.map((n) => (n.id === e.id ? { ...n, ...e } : n)));
}
function hr(e) {
	G.update((t) => [e, ...t].slice(0, pr));
}
function yr(e) {
	we(G).find((t) => t.id === e.id) ? kt(e) : hr(e);
}
function br(e) {
	G.update(
		(t) => (
			e
				? tt(e)
				: t.forEach((n) => {
						tt(n.id);
					}),
			t.map((n) => (n.id === e || e === void 0 ? { ...n, visible: !1 } : n))
		)
	);
}
function It(e) {
	G.update((t) => (e === void 0 ? [] : t.filter((n) => n.id !== e)));
}
function xr(e) {
	Re.set(e);
}
function wr(e) {
	let t;
	Re.update((n) => ((t = e - (n || 0)), null)),
		G.update((n) => n.map((o) => ({ ...o, pauseDuration: o.pauseDuration + t })));
}
const _r = { blank: 4e3, error: 4e3, success: 2e3, loading: 1 / 0, custom: 4e3 };
function kr(e = {}) {
	return {
		toasts: vr(
			G,
			(n) =>
				n.map((o) => ({
					...e,
					...e[o.type],
					...o,
					duration: o.duration || e[o.type]?.duration || e?.duration || _r[o.type],
					style: [e.style, e[o.type]?.style, o.style].join(';')
				})),
			(n) => n
		),
		pausedAt: Re
	};
}
const Ir = (e) => typeof e == 'function',
	nt = (e, t) => (Ir(e) ? e(t) : e),
	Sr = (() => {
		let e = 0;
		return () => ((e += 1), e.toString());
	})(),
	St = (() => {
		let e;
		return () => {
			if (e === void 0 && typeof window < 'u') {
				const t = matchMedia('(prefers-reduced-motion: reduce)');
				e = !t || t.matches;
			}
			return e;
		};
	})(),
	Tr = (e, t = 'blank', n) => ({
		createdAt: Date.now(),
		visible: !0,
		type: t,
		ariaProps: { role: 'status', 'aria-live': 'polite' },
		message: e,
		pauseDuration: 0,
		...n,
		id: n?.id || Sr()
	}),
	te = (e) => (t, n) => {
		const o = Tr(t, e, n);
		return yr(o), o.id;
	},
	B = (e, t) => te('blank')(e, t);
B.error = te('error');
B.success = te('success');
B.loading = te('loading');
B.custom = te('custom');
B.dismiss = (e) => {
	br(e);
};
B.remove = (e) => It(e);
B.promise = (e, t, n) => {
	const o = B.loading(t.loading, { ...n, ...n?.loading });
	return (
		e
			.then((r) => (B.success(nt(t.success, r), { id: o, ...n, ...n?.success }), r))
			.catch((r) => {
				B.error(nt(t.error, r), { id: o, ...n, ...n?.error });
			}),
		e
	);
};
function Cr(e, t, n) {
	const { reverseOrder: o, gutter: r = 8, defaultPosition: s } = n || {},
		i = t.filter((u) => (u.position || s) === (e.position || s) && u.height),
		a = i.findIndex((u) => u.id === e.id),
		l = i.filter((u, f) => f < a && u.visible).length;
	return i
		.filter((u) => u.visible)
		.slice(...(o ? [l + 1] : [0, l]))
		.reduce((u, f) => u + (f.height || 0) + r, 0);
}
const jr = {
	startPause() {
		xr(Date.now());
	},
	endPause() {
		wr(Date.now());
	},
	updateHeight: (e, t) => {
		kt({ id: e, height: t });
	},
	calculateOffset: Cr
};
function Pr(e) {
	const { toasts: t, pausedAt: n } = kr(e),
		o = new Map();
	let r;
	const s = [
		n.subscribe((i) => {
			if (i) {
				for (const [, a] of o) clearTimeout(a);
				o.clear();
			}
			r = i;
		}),
		t.subscribe((i) => {
			if (r) return;
			const a = Date.now();
			for (const l of i) {
				if (o.has(l.id) || l.duration === 1 / 0) continue;
				const c = (l.duration || 0) + l.pauseDuration - (a - l.createdAt);
				if (c < 0) return l.visible && B.dismiss(l.id), null;
				o.set(
					l.id,
					setTimeout(() => B.dismiss(l.id), c)
				);
			}
		})
	];
	return (
		st(() => {
			for (const i of s) i();
		}),
		{ toasts: t, handlers: jr }
	);
}
var Or = S('<div class="svelte-11kvm4p"></div>');
function Er(e, t) {
	H(t, !1);
	let n = F(t, 'primary', 0, '#61d345'),
		o = F(t, 'secondary', 0, '#fff');
	var r = L(e, !0, Or);
	Y(() => {
		z(r, '--primary', n()), z(r, '--secondary', o());
	}),
		E(e, r),
		R();
}
var Mr = S('<div class="svelte-1ee93ns"></div>');
function Lr(e, t) {
	H(t, !1);
	let n = F(t, 'primary', 0, '#ff4b4b'),
		o = F(t, 'secondary', 0, '#fff');
	var r = L(e, !0, Mr);
	Y(() => {
		z(r, '--primary', n()), z(r, '--secondary', o());
	}),
		E(e, r),
		R();
}
var Dr = S('<div class="svelte-1j7dflg"></div>');
function Ar(e, t) {
	H(t, !1);
	let n = F(t, 'primary', 0, '#616161'),
		o = F(t, 'secondary', 0, '#e0e0e0');
	var r = L(e, !0, Dr);
	Y(() => {
		z(r, '--primary', n()), z(r, '--secondary', o());
	}),
		E(e, r),
		R();
}
var Fr = S('<div class="animated svelte-1kgeier"> </div>'),
	Nr = S('<div class="status svelte-1kgeier"><!></div>'),
	Rr = S('<div class="indicator svelte-1kgeier"><!> <!></div>');
function be(e, t) {
	H(t, !1);
	const n = D(),
		o = D(),
		r = D();
	U(() => {
		t.toast,
			q(() => {
				(() => {
					const a = t.toast;
					return O(n, a.type), O(o, a.icon), O(r, a.iconTheme), a;
				})();
			});
	});
	var s = P(e),
		i = C(s);
	M(
		i,
		() => typeof h(o) == 'string',
		(a) => {
			var l = L(a, !0, Fr),
				c = T(l);
			rt(c, () => h(o)), E(a, l);
		},
		(a) => {
			var l = P(a),
				c = C(l);
			M(
				c,
				() => typeof h(o) < 'u',
				(u) => {
					var f = P(u),
						v = C(f);
					Oe(
						v,
						() => h(o),
						(b) => {
							b(v, {});
						}
					),
						I(u, f);
				},
				(u) => {
					var f = P(u),
						v = C(f);
					M(
						v,
						() => h(n) !== 'blank',
						(b) => {
							var p = L(b, !0, Rr),
								m = T(p),
								y = k(k(m));
							Ar(
								m,
								ge(() => h(r))
							),
								M(
									y,
									() => h(n) !== 'loading',
									(g) => {
										var d = L(g, !0, Nr),
											_ = T(d);
										M(
											_,
											() => h(n) === 'error',
											(w) => {
												var A = P(w),
													x = C(A);
												Lr(
													x,
													ge(() => h(r))
												),
													I(w, A);
											},
											(w) => {
												var A = P(w),
													x = C(A);
												Er(
													x,
													ge(() => h(r))
												),
													I(w, A);
											}
										),
											E(g, d);
									},
									null
								),
								E(b, p);
						},
						null
					),
						I(u, f);
				}
			),
				I(a, l);
		}
	),
		I(e, s),
		R();
}
var Hr = S('<div><!></div>');
function ae(e, t) {
	H(t, !1);
	var n = L(e, !0, Hr),
		o = T(n);
	xe(n, () => [{ class: 'message' }, t.toast.ariaProps], !0, 'svelte-1nauejd'),
		M(
			o,
			() => typeof t.toast.message == 'string',
			(r) => {
				var s = Lt(r);
				rt(s, () => t.toast.message), E(r, s);
			},
			(r) => {
				var s = P(r),
					i = C(s);
				Oe(
					i,
					() => t.toast.message,
					(a) => {
						a(i, {
							get toast() {
								return t.toast;
							}
						});
					}
				),
					I(r, s);
			}
		),
		E(e, n),
		R();
}
var zr = S('<!> <!>', !0),
	Br = S('<div><!></div>');
function Vr(e, t) {
	H(t, !1);
	let n = F(t, 'position', 8, () => {}),
		o = F(t, 'style', 0, ''),
		r = F(t, 'Component', 8, () => {}),
		s = D(),
		i = D();
	U(() => {
		t.toast,
			n(),
			q(() => {
				const u = (t.toast.position || n() || 'top-center').includes('top');
				O(s, u ? 1 : -1);
				const [f, v] = St() ? ['fadeIn', 'fadeOut'] : ['enter', 'exit'];
				O(i, t.toast.visible ? f : v);
			});
	});
	var a = L(e, !0, Br),
		l = T(a),
		c;
	Y(() => {
		ot(
			a,
			`base ${J(t.toast.height ? h(i) : 'transparent')} ${J(t.toast.className || '')} svelte-ug60r4`
		),
			c !== (c = `${J(o())}; ${J(t.toast.style)}`) && Pe(a, 'style', c),
			z(a, '--factor', h(s));
	}),
		M(
			l,
			r,
			(u) => {
				var f = P(u),
					v = C(f);
				Oe(v, r, (b) => {
					b(v, {
						$$slots: {
							icon: (p, m) => {
								var y = P(p),
									g = C(y);
								be(g, {
									get toast() {
										return t.toast;
									},
									slot: 'icon'
								}),
									I(p, y);
							},
							message: (p, m) => {
								var y = P(p),
									g = C(y);
								ae(g, {
									get toast() {
										return t.toast;
									},
									slot: 'message'
								}),
									I(p, y);
							}
						}
					});
				}),
					I(u, f);
			},
			(u) => {
				var f = P(u),
					v = C(f);
				Ee(
					v,
					t.children,
					{
						ToastIcon: be,
						ToastMessage: ae,
						get toast() {
							return t.toast;
						}
					},
					(b) => {
						var p = Q(b, !0, zr),
							m = C(p),
							y = k(k(m));
						be(m, {
							get toast() {
								return t.toast;
							}
						}),
							ae(y, {
								get toast() {
									return t.toast;
								}
							}),
							I(b, p);
					}
				),
					I(u, f);
			}
		),
		E(e, a),
		R();
}
var Qr = S('<div class="wrapper svelte-v01oml"><!></div>');
function Ur(e, t) {
	H(t, !1);
	const n = D(),
		o = D(),
		r = D(),
		s = D();
	let i = D();
	it(() => {
		t.setHeight(h(i).getBoundingClientRect().height);
	}),
		U(() => {
			t.toast,
				q(() => {
					O(n, t.toast.position?.includes('top') ? 0 : null);
				});
		}),
		U(() => {
			t.toast,
				q(() => {
					O(o, t.toast.position?.includes('bottom') ? 0 : null);
				});
		}),
		U(() => {
			t.toast,
				q(() => {
					O(r, t.toast.position?.includes('top') ? 1 : -1);
				});
		}),
		U(() => {
			t.toast,
				q(() => {
					O(
						s,
						(t.toast.position?.includes('center') && 'center') ||
							((t.toast.position?.includes('right') || t.toast.position?.includes('end')) &&
								'flex-end') ||
							null
					);
				});
		});
	var a = L(e, !0, Qr);
	Dt(a, (c) => O(i, c), i), He(a, 'transition', !St());
	var l = T(a);
	Y(() => {
		He(a, 'active', t.toast.visible),
			z(a, '--factor', h(r)),
			z(a, '--offset', t.toast.offset),
			z(a, 'top', h(n)),
			z(a, 'bottom', h(o)),
			z(a, 'justify-content', h(s));
	}),
		M(
			l,
			() => t.toast.type === 'custom',
			(c) => {
				var u = P(c),
					f = C(u);
				ae(f, {
					get toast() {
						return t.toast;
					}
				}),
					I(c, u);
			},
			(c) => {
				var u = P(c),
					f = C(u);
				Ee(
					f,
					t.children,
					{
						get toast() {
							return t.toast;
						}
					},
					(v) => {
						var b = P(v),
							p = C(b);
						Vr(p, {
							get toast() {
								return t.toast;
							},
							get position() {
								return t.toast.position;
							}
						}),
							I(v, b);
					}
				),
					I(c, u);
			}
		),
		E(e, a),
		R();
}
var qr = S('<div role="alert"></div>');
function Wr(e, t) {
	H(t, !1);
	const n = {};
	Nt(n);
	const o = () => Rt(u, '$toasts', n);
	let r = F(t, 'reverseOrder', 0, !1),
		s = F(t, 'position', 0, 'top-center'),
		i = F(t, 'toastOptions', 8, () => {}),
		a = F(t, 'gutter', 0, 8),
		l = F(t, 'containerStyle', 8, () => {}),
		c = F(t, 'containerClassName', 8, () => {});
	const { toasts: u, handlers: f } = Pr(i());
	let v = D();
	U(() => {
		o(),
			s(),
			r(),
			a(),
			q(() => {
				O(
					v,
					o().map((m) => ({
						...m,
						position: m.position || s(),
						offset: f.calculateOffset(m, o(), {
							reverseOrder: r(),
							gutter: a(),
							defaultPosition: s()
						})
					}))
				);
			});
	});
	var b = L(e, !0, qr),
		p;
	Y(() => {
		ot(b, `toaster ${J(c() || '')} svelte-1phplh9`), p !== (p = l()) && Pe(b, 'style', p);
	}),
		ze('mouseenter', b, f.startPause, !1),
		ze('mouseleave', b, f.endPause, !1),
		At(
			b,
			() => h(v),
			13,
			(m, y) => pe(m).id,
			(m, y, g) => {
				var d = P(m),
					_ = C(d);
				Ur(_, {
					get toast() {
						return pe(y);
					},
					setHeight: (w) => f.updateHeight(pe(y).id, w)
				}),
					I(m, d);
			},
			null
		),
		E(e, b),
		R();
}
var Gr = S(
	'<footer class="w-full border-t-2 border-black bg-white"><div class="mx-auto max-w-2xl w-full"><p class="text-sm text-black font-bold text-center py-6"> </p></div></footer>'
);
function Kr(e, t) {
	H(t, !1);
	const n = new Date().getFullYear();
	var o = L(e, !0, Gr),
		r = T(o),
		s = T(r),
		i = T(s);
	(i.nodeValue = `© ${J(n)} omfj`), E(e, o), R();
}
var Jr = S(
	'<div class="flex flex-col min-h-screen"><!> <main class="max-w-4xl mx-auto w-full py-8 px-4"><!></main> <div class="flex-grow"></div> <!></div> <!>',
	!0
);
function ro(e, t) {
	H(t, !0), Qt(t.data.user);
	var n = Q(e, !0, Jr),
		o = C(n),
		r = T(o),
		s = k(k(r)),
		i = T(s);
	Ee(i, t.children, {}, null);
	var a = k(k(s)),
		l = k(k(a)),
		c = k(k(o));
	gr(r, {}), Kr(l, {}), Wr(c, {}), I(e, n), R();
}
export { ro as component };
