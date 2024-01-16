const se = () => {};
function H(e) {
	for (var n = 0; n < e.length; n++) e[n]();
}
function Pe(e, n, t) {
	if (e == null) return n(void 0), t && t(void 0), se;
	const u = e.subscribe(n, t);
	return u.unsubscribe ? () => u.unsubscribe() : u;
}
var ae = Array.isArray,
	on = Array.from,
	sn = Object.keys,
	fn = Object.assign,
	ln = Object.defineProperty,
	Me = Object.getOwnPropertyDescriptor,
	_n = Object.getOwnPropertyDescriptors;
function an(e) {
	return typeof e == 'function';
}
const dn = 1,
	pn = 2,
	hn = 4,
	En = 8,
	mn = 16,
	vn = 64,
	qe = 1,
	Fe = 4,
	He = 8,
	yn = [
		'beforeinput',
		'click',
		'dblclick',
		'contextmenu',
		'focusin',
		'focusout',
		'keydown',
		'keyup',
		'mousedown',
		'mousemove',
		'mouseout',
		'mouseover',
		'mouseup',
		'pointerdown',
		'pointermove',
		'pointerout',
		'pointerover',
		'pointerup',
		'touchend',
		'touchmove',
		'touchstart'
	],
	bn = ['touchstart', 'touchmove', 'touchend'],
	An = {
		formnovalidate: 'formNoValidate',
		ismap: 'isMap',
		nomodule: 'noModule',
		playsinline: 'playsInline',
		readonly: 'readOnly'
	},
	Ke = 0,
	ne = 1,
	de = 2,
	Ue = 3,
	Tn = 4,
	kn = 5,
	Ye = 6,
	Be = 7,
	je = 9;
function On(e) {
	return { d: null, e: null, i: e, p: null, r: null, t: Ke };
}
function Cn() {
	return { a: null, ae: null, c: null, ce: null, d: null, e: null, p: h, r: null, t: ne, v: !1 };
}
function In() {
	return { d: null, e: null, p: h, r: null, t: Ye };
}
function wn() {
	return { d: null, e: null, p: h, r: null, t: Be };
}
function Rn(e, n) {
	return { a: n, d: null, f: e, v: [], e: null, p: h, r: null, s: [], t: de };
}
function Sn(e, n, t) {
	return { a: null, d: null, e: null, i: n, k: t, v: e, p: h, r: null, s: null, t: Ue };
}
function xn() {
	return { d: null, p: h, e: null, r: null, t: je };
}
const pe = 1,
	K = 2,
	B = 4,
	j = 8,
	N = 16,
	L = 64,
	D = 128,
	A = 256,
	b = 512,
	U = 1024,
	te = 2048,
	J = 4096,
	Q = B | j | N,
	he = 0,
	Ve = 1,
	Z = Symbol(),
	Ee = Symbol();
let V = he,
	z = !1,
	W = !1,
	X = !1,
	E = [],
	S = [],
	ue = [],
	re = [],
	Y = 0,
	k = null,
	o = null,
	p = null,
	d = 0,
	O = null,
	C = !1,
	ce = !1,
	F = !1,
	h = null,
	i = null,
	ee = !1;
function G(e) {
	const n = e || i;
	return n !== null && n.r;
}
function me(e, n) {
	return e === n;
}
function Ze(e, n) {
	return { c: null, e: me, f: e, v: n, x: null };
}
function ve(e, n, t) {
	return { b: t, c: null, d: null, e: null, f: e, i: null, r: null, v: n, x: null, y: null };
}
function ye(e, n) {
	const t = e.r;
	t === null ? (e.r = [n]) : t.push(n);
}
function fe(e) {
	const n = e.f;
	if (n & b || e.v === Z) return !0;
	if (n & U) {
		const t = e.d;
		if (t !== null) {
			const u = t.length;
			let r;
			for (r = 0; r < u; r++) {
				const c = t[r];
				if (c.f & U && !fe(c)) {
					T(c, A);
					continue;
				}
				if (c.f & b)
					if (c.f & K) {
						if ((Re(c, !0), e.f & b)) return !0;
					} else return !0;
			}
		}
	}
	return !1;
}
function be(e) {
	const n = e.i,
		t = p,
		u = d,
		r = O,
		c = k,
		_ = h,
		s = i,
		y = F,
		m = (e.f & N) !== 0,
		v = C;
	(p = null),
		(d = 0),
		(O = null),
		(k = e),
		(h = e.b),
		(i = e.x),
		(F = o === null && (e.f & D) !== 0),
		(C = !1),
		m && i?.u != null && i.u.e();
	try {
		let f;
		m ? (f = n(e.b)) : (f = n());
		let l = e.d;
		if (p !== null) {
			let a;
			if (l !== null) {
				const I = d === 0 ? l : l.slice(0, d).concat(p),
					w = I.length,
					_e = w > 16 ? new Set(I) : null;
				for (a = d; a < w; a++) {
					const g = I[a];
					((_e !== null && !_e.has(g)) || !I.includes(g)) && Ae(e, g, !1);
				}
			}
			if (l !== null && d > 0)
				for (l.length = d + p.length, a = 0; a < p.length; a++) l[d + a] = p[a];
			else e.d = l = p;
			if (!F)
				for (a = d; a < l.length; a++) {
					const I = l[a],
						w = I.c;
					w === null ? (I.c = [e]) : w[w.length - 1] !== e && w.push(e);
				}
		} else l !== null && d < l.length && ($(e, d, !1), (l.length = d));
		return f;
	} finally {
		(p = t), (d = u), (O = r), (k = c), (h = _), (i = s), (F = y), (C = v);
	}
}
function Ae(e, n, t) {
	const u = n.c;
	let r = 0;
	if (u !== null) {
		r = u.length - 1;
		const c = u.indexOf(e);
		c !== -1 && (r === 0 ? (n.c = null) : ((u[c] = u[r]), u.pop()));
	}
	t && r === 0 && n.f & D && (T(n, b), $(n, 0, !0));
}
function $(e, n, t) {
	const u = e.d;
	if (u !== null) {
		const r = n === 0 ? null : u.slice(0, n);
		let c;
		for (c = n; c < u.length; c++) {
			const _ = u[c];
			(r === null || !r.includes(_)) && Ae(e, _, t);
		}
	}
}
function Te(e) {
	const n = e.r;
	if (((e.r = null), n !== null)) {
		let t;
		for (t = 0; t < n.length; t++) {
			const u = n[t];
			u.f & Q ? Se(u) : ($(u, 0, !0), (u.d = null));
		}
	}
}
function ze(e, n) {
	if (e !== null) throw n;
}
function ke(e) {
	if (e.f & J) return;
	const n = e.v,
		t = o;
	o = e;
	try {
		Te(e), n !== null && n();
		const r = be(e);
		typeof r == 'function' && (e.v = r);
	} catch (r) {
		const c = e.b;
		if (c !== null) ze(c, r);
		else throw r;
	} finally {
		o = t;
	}
	const u = e.x;
	G(u) && e.f & j && E.length > 0 && Ge(u);
}
function Oe() {
	if (Y > 100) throw new Error('ERR_SVELTE_TOO_MANY_UPDATES');
	Y++;
}
function x(e) {
	const n = e.length;
	if (n > 0) {
		Oe();
		let t;
		for (t = 0; t < n; t++) {
			const u = e[t],
				r = u.f;
			r & (J | te) || (fe(u) ? (T(u, A), ke(u)) : r & U && T(u, A));
		}
		e.length = 0;
	}
}
function We() {
	if (((z = !1), Y > 101)) return;
	const e = E,
		n = S;
	(E = []), (S = []), x(e), x(n), z || (Y = 0);
}
function P(e, n) {
	const t = e.f;
	n
		? (ke(e), T(e, A))
		: (V === he && (z || ((z = !0), queueMicrotask(We))), t & B ? S.push(e) : E.push(e));
}
function Ce() {
	W = !1;
	const e = ue.slice();
	(ue = []), H(e);
}
function Ie() {
	X = !1;
	const e = re.slice();
	(re = []), H(e);
}
function Nn(e) {
	W || ((W = !0), setTimeout(Ce, 0)), ue.push(e);
}
function Ln(e) {
	X || ((X = !0), requestAnimationFrame(Ie)), re.push(e);
}
function Xe() {
	const e = [];
	for (let n = 0; n < E.length; n++) {
		const t = E[n];
		t.f & N && t.x === i && (e.push(t), E.splice(n, 1), n--);
	}
	x(e);
}
function Ge(e) {
	const n = [];
	for (let t = 0; t < E.length; t++) {
		const u = E[t];
		u.f & j && u.x === e && (n.push(u), E.splice(t, 1), t--);
	}
	x(n);
}
function we(e) {
	const n = V,
		t = E,
		u = S;
	try {
		Oe();
		const r = [],
			c = [];
		(V = Ve),
			(E = r),
			(S = c),
			x(t),
			x(u),
			e !== void 0 && e(),
			(E.length > 0 || c.length > 0) && we(),
			X && Ie(),
			W && Ce(),
			(Y = 0);
	} finally {
		(V = n), (E = t), (S = u);
	}
}
async function Dn() {
	await Promise.resolve(), we();
}
function Re(e, n) {
	const t = ee;
	ee = !0;
	const u = be(e);
	ee = t;
	const r = F || (o === null && e.f & D) ? b : A;
	T(e, r);
	const c = e.e;
	c(u, e.v) || ((e.v = u), le(e, b, n));
}
function Pn(e, n, t) {
	let u = t[n];
	const r = u === void 0;
	r && ((u = { store: null, last_value: null, value: xe(Z), unsubscribe: se }), (t[n] = u)),
		(r || u.store !== e) &&
			(u.unsubscribe(), (u.store = e ?? null), (u.unsubscribe = Je(e, u.value)));
	const c = R(u.value);
	return c === Z ? u.last_value : c;
}
function Je(e, n) {
	return e == null
		? (oe(n, void 0), se)
		: Pe(e, (u) => {
				(ce = !0), oe(n, u), (ce = !1);
			});
}
function Mn(e) {
	cn(() => {
		let n;
		for (n in e) e[n].unsubscribe();
	});
}
function R(e) {
	const n = e.f;
	if (n & J) return e.v;
	if (k !== null && !(k.f & L) && !C) {
		const t = (k.f & D) !== 0,
			u = k.d;
		p === null && u !== null && u[d] === e && !(t && o !== null)
			? d++
			: (u === null || d === 0 || u[d - 1] !== e) &&
				(p === null ? (p = [e]) : e !== p[p.length - 1] && p.push(e)),
			O !== null && o !== null && o.f & A && O.includes(e) && (T(o, b), P(o, !1));
	}
	return n & K && fe(e) && Re(e, !1), e.v;
}
function oe(e, n) {
	return ie(e, n), n;
}
function qn(e, n) {
	return (
		ie(
			e,
			Ne(() => R(e))
		),
		n
	);
}
function q(e, n, t, u = new Set()) {
	const r = e.f;
	if (((r & te) !== 0) !== t) {
		(e.f ^= te), !t && r & Q && !(r & A) && P(e, !1);
		const s = e.b;
		if (s !== null && !u.has(s)) {
			u.add(s);
			const y = s.t;
			if (y === ne) {
				const m = s.e,
					v = n.b?.p;
				m !== null && v?.t === ne && q(m, n, t);
				const f = s.ce;
				f !== null && q(f, n, t, u);
				const l = s.ae;
				l !== null && q(l, n, t, u);
			} else if (y === de) {
				const m = s.v;
				for (let { e: v } of m) v !== null && q(v, n, t, u);
			}
		}
	}
	const _ = e.r;
	if (_ !== null) {
		let s;
		for (s = 0; s < _.length; s++) q(_[s], n, t, u);
	}
}
function le(e, n, t) {
	const u = G(e.x),
		r = e.c;
	if (r !== null) {
		const c = r.length;
		let _;
		for (_ = 0; _ < c; _++) {
			const s = r[_],
				y = s.f,
				m = (y & D) !== 0,
				v = (y & b) !== 0;
			(v && !m) ||
				((!t || !u) && s === o) ||
				(T(s, n), (y & A || (v && m)) && (s.f & Q ? P(s, !1) : le(s, U, t)));
		}
	}
}
function ie(e, n) {
	if (!C && !ce && k !== null && G(e.x) && k.f & K) throw new Error('ERR_SVELTE_UNSAFE_MUTATION');
	if (e.f & pe && !e.e(n, e.v)) {
		const t = e.x;
		if (
			((e.v = n),
			G(t) &&
				o !== null &&
				o.c === null &&
				o.f & A &&
				(p !== null && p.includes(e) ? (T(o, b), P(o, !1)) : O === null ? (O = [e]) : O.push(e)),
			le(e, b, !0),
			o === null && E.length === 0)
		) {
			const u = t?.u;
			if (u != null) {
				H(u.b);
				const r = en(() => {
					Se(r), H(u.a);
				});
			}
		}
	}
}
function Se(e) {
	const n = e.v,
		t = e.y,
		u = e.f;
	Te(e),
		$(e, 0, !0),
		(e.i = e.r = e.y = e.x = e.b = e.v = e.d = e.c = null),
		T(e, J),
		t !== null && (ae(t) ? H(t) : t()),
		n !== null && u & Q && n();
}
function Qe(e) {
	const n = o === null,
		t = n ? K | D : K,
		u = ve(t | A, Z, h);
	return (u.i = e), (u.x = i), (u.e = me), n || ye(o, u), u;
}
function $e(e) {
	const n = Ze(pe | A, e);
	return (n.x = i), n;
}
function xe(e) {
	const n = $e(e);
	return (n.e = De), n;
}
function Ne(e) {
	const n = C;
	try {
		return (C = !0), e();
	} finally {
		C = n;
	}
}
function M(e, n, t, u, r) {
	const c = ve(e | b, null, u);
	return (c.i = n), (c.x = i), r && P(c, t), o !== null && !(e & L) && ye(o, c), c;
}
function Fn() {
	return o ? (o.f & L) === 0 : !1;
}
function ge(e) {
	if (o === null) throw new Error('ERR_SVELTE_ORPHAN_EFFECT');
	const n = o.f & N && i !== null && !i.m,
		t = M(B, e, !1, h, !n);
	if (n) {
		let u = i.e;
		u === null && (u = i.e = []), u.push(t);
	}
	return t;
}
function Hn(e) {
	return M(B, e, !1, h, !0);
}
function en(e) {
	return M(B | L, e, !1, h, !0);
}
function Kn(e, n) {
	return M(j | L, e, n, h, !0);
}
function Un(e) {
	if (o === null) throw new Error('ERR_SVELTE_ORPHAN_EFFECT');
	const n = o !== null && (o.f & N) !== 0;
	return M(
		j,
		() => {
			const t = e();
			return Xe(), t;
		},
		n,
		h,
		!0
	);
}
function Yn(e, n = h, t = !1, u = !0) {
	let r = N;
	return t && (r |= L), M(r, e, u, n, !0);
}
function Bn(e, n) {
	let t = e.y;
	t === null ? (e.y = n) : ae(t) ? t.push(n) : (e.y = [t, n]);
}
const nn = ~(b | U | A);
function T(e, n) {
	e.f = (e.f & nn) | n;
}
function tn(e) {
	return typeof e == 'object' && e !== null && typeof e.f == 'number';
}
function un(e) {
	return typeof e == 'object' && e !== null && e.t === Ee;
}
function jn(e, n, t, u) {
	var r = (t & qe) !== 0,
		c = Me(e, n)?.set,
		_ = e[n];
	_ === void 0 && u !== void 0 && (t & He && (u = u()), (_ = u), c && c(_));
	var s = () => {
		var f = e[n];
		return f !== void 0 && (u = void 0), f === void 0 ? u : f;
	};
	if (!(t & Fe)) return s;
	if (c)
		return function (f) {
			return arguments.length === 1 ? (c(f), f) : s();
		};
	var y = !1,
		m = xe(_),
		v = Qe(() => {
			var f = s(),
				l = R(m);
			return y ? ((y = !1), l) : (m.v = f);
		});
	return (
		r || (v.e = De),
		function (f, l = !1) {
			var a = R(v);
			return arguments.length > 0
				? ((l || (r ? f !== a : Le(f, a))) && ((y = !0), oe(m, l ? a : f), R(v)), f)
				: a;
		}
	);
}
function Le(e, n) {
	return e != e
		? n == n
		: e !== n || (e !== null && typeof e == 'object') || typeof e == 'function';
}
function De(e, n) {
	return !Le(e, n);
}
function Vn() {
	const e = i;
	if (e === null) throw new Error('ERR_SVELTE_ORPHAN_CONTEXT');
	let n = e.c;
	if (n === null) {
		const t = rn(e);
		n = e.c = new Map(t || void 0);
	}
	return n;
}
function rn(e) {
	let n = e.p;
	for (; n !== null; ) {
		const t = n.c;
		if (t !== null) return t;
		n = n.p;
	}
	return null;
}
function Zn(e, n = 1) {
	const t = R(e);
	return ie(e, t + n), t;
}
function cn(e) {
	ge(() => () => Ne(e));
}
function zn(e, n = !1) {
	i = { a: null, c: null, e: null, m: !1, p: i, s: e, r: n, u: null };
}
function Wn(e) {
	const n = i;
	if (n !== null) {
		e !== void 0 && (n.a = e);
		const t = n.e;
		if (t !== null) {
			n.e = null;
			for (let u = 0; u < t.length; u++) P(t[u], !1);
		}
		(i = n.p), (n.m = !0);
	}
}
function Xn(e, n) {
	return { o: e, p: n, t: Ee };
}
function Gn(e) {
	return tn(e) ? R(e) : un(e) ? e.o[e.p] : e;
}
export {
	wn as $,
	Tn as A,
	q as B,
	ke as C,
	En as D,
	Ue as E,
	mn as F,
	Ln as G,
	Be as H,
	ne as I,
	de as J,
	kn as K,
	Se as L,
	en as M,
	H as N,
	h as O,
	o as P,
	Bn as Q,
	Ke as R,
	Cn as S,
	In as T,
	Z as U,
	fn as V,
	An as W,
	sn as X,
	On as Y,
	on as Z,
	tn as _,
	zn as a,
	_n as a0,
	yn as a1,
	we as a2,
	bn as a3,
	xn as a4,
	an as a5,
	hn as a6,
	Xn as a7,
	dn as a8,
	ie as a9,
	un as aa,
	Rn as ab,
	pn as ac,
	Sn as ad,
	vn as ae,
	Qe as af,
	cn as ag,
	qn as ah,
	Pe as ai,
	ge as b,
	Ne as c,
	i as d,
	Gn as e,
	ln as f,
	Vn as g,
	jn as h,
	ae as i,
	Un as j,
	R as k,
	$e as l,
	oe as m,
	Zn as n,
	ee as o,
	Wn as p,
	Me as q,
	Yn as r,
	Pn as s,
	Dn as t,
	Mn as u,
	xe as v,
	Fn as w,
	Nn as x,
	Hn as y,
	Kn as z
};
