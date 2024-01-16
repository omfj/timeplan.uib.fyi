import {
	f as le,
	l as U,
	i as T,
	m as K,
	n as Oe,
	o as vt,
	q as z,
	v as ye,
	k as Z,
	U as W,
	w as Te,
	x as yt,
	E as qe,
	A as We,
	I as ne,
	R as gt,
	y as re,
	z as Ye,
	B as Ie,
	C as S,
	D as P,
	F as ge,
	G as mt,
	K as wt,
	H as xt,
	J as Et,
	L as N,
	M as bt,
	N as me,
	O as Ae,
	P as Ct,
	c as $,
	r as b,
	Q as G,
	S as At,
	T as kt,
	V as Fe,
	W as Nt,
	X as Lt,
	Y as St,
	a as Ot,
	d as Tt,
	p as It,
	Z as Bt,
	_ as Mt,
	$ as zt,
	a0 as Rt,
	a1 as Kt,
	a2 as Pt,
	a3 as Be,
	a4 as Dt,
	a5 as Q,
	a6 as Ue,
	a7 as Me,
	a8 as ce,
	a9 as ze,
	aa as $t,
	ab as Ht,
	ac as ke,
	ad as Vt,
	ae as jt
} from './runtime.zBIj1Mfk.js';
const k = Symbol('$state'),
	qt = Object.prototype,
	Wt = Array.prototype,
	Yt = Object.getPrototypeOf,
	Ft = Object.isFrozen;
function Y(e, t = !0) {
	if (typeof e == 'object' && e != null && !Ft(e)) {
		if (k in e) return e[k].p;
		const s = Yt(e);
		if (s === qt || s === Wt) {
			const n = new Proxy(e, Gt);
			return le(e, k, { value: Ut(e, n, t), writable: !1 }), n;
		}
	}
	return e;
}
function Ut(e, t, s) {
	return { s: new Map(), v: U(0), a: T(e), i: s, p: t };
}
const Gt = {
	defineProperty(e, t, s) {
		if (s.value) {
			const n = e[k],
				i = n.s.get(t);
			i !== void 0 && K(i, Y(s.value, n.i));
		}
		return Reflect.defineProperty(e, t, s);
	},
	deleteProperty(e, t) {
		const s = e[k],
			n = s.s.get(t),
			i = s.a,
			l = delete e[t];
		if (i && l) {
			const r = s.s.get('length'),
				_ = e.length - 1;
			r !== void 0 && r.v !== _ && K(r, _);
		}
		return n !== void 0 && K(n, W), t in e && Oe(s.v), l;
	},
	get(e, t, s) {
		const n = e[k];
		let i = n.s.get(t);
		if (
			(i === void 0 &&
				(Te() || vt) &&
				(!(t in e) || z(e, t)?.writable) &&
				((i = (n.i ? U : ye)(Y(e[t], n.i))), n.s.set(t, i)),
			i !== void 0)
		) {
			const l = Z(i);
			return l === W ? void 0 : l;
		}
		return Reflect.get(e, t, s);
	},
	getOwnPropertyDescriptor(e, t) {
		const s = Reflect.getOwnPropertyDescriptor(e, t);
		if (s && 'value' in s) {
			const i = e[k].s.get(t);
			i && (s.value = Z(i));
		}
		return s;
	},
	has(e, t) {
		if (t === k) return !0;
		const s = e[k],
			n = Reflect.has(e, t);
		let i = s.s.get(t);
		return (i !== void 0 || (Te() && (!n || z(e, t)?.writable))) &&
			(i === void 0 && ((i = (s.i ? U : ye)(n ? Y(e[t], s.i) : W)), s.s.set(t, i)), Z(i) === W)
			? !1
			: n;
	},
	set(e, t, s) {
		const n = e[k],
			i = n.s.get(t);
		i !== void 0 && K(i, Y(s, n.i));
		const l = n.a,
			r = !(t in e);
		if (l && t === 'length')
			for (let _ = s; _ < e.length; _ += 1) {
				const o = n.s.get(_ + '');
				o !== void 0 && K(o, W);
			}
		if ((r && Oe(n.v), (e[t] = s), l && r)) {
			const _ = n.s.get('length'),
				o = e.length;
			_ !== void 0 && _.v !== o && K(_, o);
		}
		return !0;
	},
	ownKeys(e) {
		const t = e[k];
		return Z(t.v), Reflect.ownKeys(e);
	}
};
let w = null;
function L(e) {
	w = e;
}
function H(e) {
	const t = [];
	let s = e,
		n = null;
	for (; s !== null; ) {
		const i = s.nodeType,
			l = s.nextSibling;
		if (i === 8) {
			const r = s.data;
			if (r.startsWith('ssr:')) {
				const _ = r.slice(4);
				if (n === null) n = _;
				else {
					if (_ === n) return t;
					t.push(s);
				}
				s = l;
				continue;
			}
		}
		n !== null && t.push(s), (s = l);
	}
	return null;
}
function V(e, t) {
	let s = e;
	if (w !== null)
		if ((t && (s = s.firstChild), s.nodeType === 8)) {
			let n = s.$$fragment;
			n === void 0
				? (n = H(s))
				: yt(() => {
						s.$$fragment = void 0;
					}),
				L(n);
		} else {
			const n = s.firstChild;
			L(n === null ? [] : [n]);
		}
}
var B, ee, Re, te, Ge, Xe, Je, Ze, Ne, Qe, et, tt, Xt;
function Jt() {
	B === void 0 &&
		((B = Node.prototype),
		(ee = Element.prototype),
		(Re = Text.prototype),
		(te = Map.prototype),
		(Ge = B.appendChild),
		(Xe = B.cloneNode),
		(Je = te.set),
		(Ze = te.get),
		te.delete,
		(Xt = document),
		(ee.__click = void 0),
		(Re.__nodeValue = ' '),
		(ee.__className = ''),
		(Ne = z(B, 'firstChild').get),
		(Qe = z(B, 'nextSibling').get),
		(et = z(B, 'textContent').set),
		(tt = z(ee, 'className').set));
}
function we(e, t) {
	Ge.call(e, t);
}
function nt(e, t, s) {
	Je.call(e, t, s);
}
function xe(e, t) {
	return Ze.call(e, t);
}
function Zt(e, t) {
	return Xe.call(e, t);
}
function Qt(e) {
	const t = Ne.call(e);
	if (w !== null)
		if (t === null) {
			const s = document.createTextNode('');
			return e.appendChild(s), s;
		} else return Le(t);
	return t;
}
function Tn(e) {
	if (w !== null) {
		const t = e[0];
		return w !== null && t !== null ? Le(t) : t;
	}
	return Ne.call(e);
}
function In(e) {
	const t = Qe.call(e);
	return w !== null && t !== null ? Le(t) : t;
}
function en(e, t) {
	tt.call(e, t);
}
function st(e) {
	et.call(e, '');
}
function Le(e) {
	if (e.nodeType === 8 && e.data.startsWith('ssr:') && w.at(-1) !== e) {
		const t = H(e),
			n = (t.at(-1) || e).nextSibling;
		return (n.$$fragment = t), n;
	}
	return e;
}
function it(e) {
	var t = document.createElement('template');
	return (t.innerHTML = e), t.content;
}
function se(e, t, s) {
	if (T(e)) {
		for (var n = 0, i; n < e.length; n++) (i = e[n]), s === null ? we(t, i) : s.before(i);
		return e[0];
	} else e !== null && (s === null ? we(t, e) : s.before(e));
	return e;
}
function E(e) {
	var t = e;
	if (T(e))
		for (var s = 0, n; s < e.length; s++)
			(n = e[s]), s === 0 && (t = n), n.isConnected && n.remove();
	else e.isConnected && e.remove();
	return t;
}
function tn(e, t, s) {
	if ((V(e), w !== null)) return w;
	var n = t + '',
		i = e,
		l;
	s && (n = `<svg>${n}</svg>`);
	var r = it(n);
	s && (r = r.firstChild);
	var _ = r.cloneNode(!0);
	return (
		(l = Array.from(_.childNodes)),
		l.forEach((o) => {
			i.before(o);
		}),
		l
	);
}
const Ee = { tick: (e) => requestAnimationFrame(e), now: () => performance.now() },
	M = new Set(),
	Ke = Number.MIN_SAFE_INTEGER;
let oe;
function nn(e, t, { bubbles: s = !1, cancelable: n = !1 } = {}) {
	const i = document.createEvent('CustomEvent');
	return i.initCustomEvent(e, s, n, t), i;
}
function pe(e, t) {
	e.dispatchEvent(nn(t));
}
function sn(e) {
	const t = e.split('-');
	return t.length === 1
		? t[0]
		: t[0] +
				t
					.slice(1)
					.map((s) => s[0].toUpperCase() + s.slice(1))
					.join('');
}
function ln(e) {
	const t = {},
		s = e.split(';');
	for (const n of s) {
		const [i, l] = n.split(':');
		if (!i || l === void 0) break;
		const r = sn(i.trim());
		t[r] = l.trim();
	}
	return t;
}
class rn {
	onfinish;
	#i;
	#l;
	#n;
	#r;
	#o;
	paused;
	#t;
	#e;
	#s;
	constructor(t, s, n, i) {
		(this.#l = s),
			(this.#r = n),
			(this.paused = !1),
			(this.#i = t),
			(this.#t = i),
			(this.#e = n),
			(this.#n = i ? s : 0),
			(this.#o = 0),
			(this.#s = !1),
			(this.onfinish = null),
			this.#r && (i || this.#i(0, 1));
	}
	pause() {
		this.paused = !0;
	}
	play() {
		(this.paused = !1),
			M.has(this) || ((this.#o = Ee.now()), oe === void 0 && (oe = Ee.tick(lt)), M.add(this));
	}
	#f() {
		(this.#t = !this.#t), this.paused && (this.#n === 0 && (this.#n = this.#l), this.play());
	}
	reverse() {
		this.#r === 0 ? this.#f() : ((this.#e = this.#r), (this.#s = !0));
	}
	cancel() {
		M.delete(this);
		const t = this.#n / this.#l;
		if (t > 0 && t < 1) {
			const s = this.#t ? 1 : 0;
			this.#i(s, 1 - s);
		}
	}
	finish() {
		M.delete(this), this.onfinish && this.onfinish();
	}
	_update(t) {
		let s = t - this.#o;
		if (((this.#o = t), this.#e !== 0)) {
			const i = this.#e === Ke;
			let l = !this.#s;
			if (((this.#e -= s), this.#e < 0 || i || (this.#e === 0 && this.#t))) {
				const r = i ? 0 : -this.#e;
				(this.#e = 0),
					this.#s ? ((this.#s = !1), this.#f()) : (r !== 0 || this.#t) && (s = r),
					(l = !1);
			} else this.#e === 0 && (this.#e = Ke);
			if (l) return;
		}
		this.#n += this.#t ? -s : s;
		let n = this.#n / this.#l;
		n < 0 ? (n = 0) : n > 1 && (n = 1),
			((this.#t && n <= 0) || (!this.#t && n >= 1)) &&
				((n = this.#t ? 0 : 1),
				this.#e === 0 && (M.delete(this), this.onfinish && ((this.paused = !0), this.onfinish()))),
			this.#i(n, 1 - n);
	}
}
function lt(e) {
	for (const t of M) t.paused || t._update(e);
	M.size !== 0 ? (oe = Ee.tick(lt)) : (oe = void 0);
}
function on(e, t, s, n) {
	let i = 'in',
		l = [],
		r = null,
		_ = !1;
	const o = () => {
			let a = f.p;
			if ((typeof a == 'function' && (a = a({ direction: i })), a == null)) return;
			const c = a.duration ?? 300,
				u = a.delay ?? 0,
				v = a.css,
				d = a.tick,
				g = (h) => h,
				p = a.easing || g,
				y = [];
			if (typeof d == 'function') r = new rn(d, c, u, s === 'out');
			else {
				if (typeof v == 'function') {
					const m = Math.max(c, 16.666);
					for (let C = 0; C <= m; C += 16.666) {
						let A;
						C + 16.666 > m ? (A = 1) : C === 0 ? (A = 0) : (A = C / m);
						const I = p(A);
						y.push(ln(v(I, 1 - I)));
					}
					s === 'out' && y.reverse();
				}
				r = e.animate(y, { duration: c, endDelay: u, delay: u, fill: 'both' });
			}
			r.pause(),
				(r.onfinish = () => {
					const h = i === 'out';
					r.cancel(), h && (me(l), (l = [])), pe(e, h ? 'outroend' : 'introend');
				});
		},
		f = {
			e: n,
			i: t,
			p: null,
			f(a) {
				l.push(a);
			},
			in() {
				const a = i !== 'in';
				(i = 'in'),
					(r === null || _) && ((_ = !1), o()),
					r === null ? f.x() : (pe(e, 'introstart'), a && r.reverse(), r.play());
			},
			o() {
				if (e.__animate) {
					const u = getComputedStyle(e),
						v = u.position;
					if (v !== 'absolute' && v !== 'fixed') {
						const { width: d, height: g } = u,
							p = e.getBoundingClientRect();
						(e.style.position = 'absolute'), (e.style.width = d), (e.style.height = g);
						const y = e.getBoundingClientRect();
						if (p.left !== y.left || p.top !== y.top) {
							const h = `translate(${p.left - y.left}px, ${p.top - y.top}px)`,
								m = u.transform;
							if (m === 'none') e.style.transform = h;
							else {
								const A = { transform: m.startsWith('matrix(1,') ? h : 'matrix(1,0,0,1,0,0)' };
								e.animate([A, A], { duration: 1 }).pause();
							}
						}
					}
				}
				const c = s === 'both' && i !== 'out';
				(i = 'out'),
					(r === null || _) && ((_ = !1), o()),
					r === null ? f.x() : (pe(e, 'outrostart'), c ? r.reverse() : r.play());
			},
			c() {
				r !== null && r.cancel(), (_ = !0);
			},
			x() {
				me(l), (l = []);
			},
			r: s,
			d: e
		};
	return f;
}
function Pe(e) {
	const t = e.t;
	return t === ne || t === qe || t === wt || t === We || t === xt || (t === Et && e.v.length === 0);
}
function rt(e, t, s, n, i) {
	const l = Ct,
		r = Ae,
		_ = n === 'key';
	let o = !0,
		f = !1;
	_ && (e.__animate = !0);
	let a = r;
	for (; a !== null; )
		Pe(a)
			? (a.t === qe
					? ((a.r = cn), (a.a = an), (a = a.p))
					: a.t === We && a.n
						? (o = !1)
						: a.t === ne && (a.r = fn),
				!f && o && (o = a.e === null),
				(!o || !i) && (f = !0))
			: !f && a.t === gt && (a.e !== null || a.i) && (o = !1),
			(a = a.p);
	let c;
	re(() => {
		c !== void 0 && c.x();
		const u = t();
		c = on(
			e,
			(y) =>
				$(() => {
					const h = s === null ? {} : s();
					return _
						? u(e, { from: y, to: e.getBoundingClientRect() }, h, {})
						: u(e, h, { direction: n });
				}),
			n,
			l
		);
		const d = n === 'in',
			g = !o && (d || n === 'both');
		g && (c.p = c.i());
		const p = Ye(() => {
			N(p), (e.inert = !1), g && c.in();
			let y = r;
			for (; !d && y !== null; ) {
				const h = y.p;
				if (
					Pe(y) &&
					(y.r !== null && y.r(c), h === null || (!i && (y.t !== ne || h.t !== ne || h.v)))
				)
					break;
				y = h;
			}
		}, !1);
	}),
		n === 'key' &&
			re(() => () => {
				c.x();
			});
}
function O(e, t, s) {
	const n = [];
	for (const i of e) {
		const l = i.r,
			r = i.e;
		t === 'in'
			? (l === 'in' || l === 'both' ? i.in() : i.c(), (i.d.inert = !1), Ie(r, r, !1))
			: t === 'key'
				? l === 'key' && ((i.p = i.i(s)), i.in())
				: ((l === 'out' || l === 'both') && ((i.p = i.i()), n.push(i.o)),
					(i.d.inert = !0),
					Ie(r, r, !0));
	}
	if (n.length > 0) {
		const i = Ye(() => {
			N(i);
			const l = bt(() => {
				N(l), me(n);
			});
		}, !1);
	}
}
function fn(e) {
	const t = this;
	if (t.v) {
		let s = t.c;
		s === null && (s = t.c = new Set()),
			s.add(e),
			e.f(() => {
				const n = s;
				n.delete(e), n.size === 0 && S(t.ce);
			});
	} else {
		let s = t.a;
		s === null && (s = t.a = new Set()),
			s.add(e),
			e.f(() => {
				const n = s;
				n.delete(e), n.size === 0 && S(t.ae);
			});
	}
}
function cn(e) {
	const t = this,
		s = t.p;
	if ((s.f & P) !== 0) {
		const l = ae();
		(s.f ^= P), we(s.a, l), (s.a = l);
	}
	e.r === 'key' && !(s.f & ge) && (s.f |= ge);
	let i = t.s;
	i === null && (t.s = i = new Set()),
		e.f(() => {
			if (i !== null && (i.delete(e), e.r !== 'key')) {
				for (let l of i) {
					const r = l.r;
					(r === 'key' || r === 'in') && i.delete(l);
				}
				i.size === 0 && ((t.s = null), R(t, null, !0));
			}
		}),
		i.add(e);
}
function an(e, t) {
	const n = Ln(e).getBoundingClientRect();
	for (const i of t) i.r === 'key' && i.c();
	mt(() => {
		O(t, 'key', n);
	});
}
const ot = new Set(),
	be = new Set();
function ae() {
	return document.createTextNode('');
}
function ft(e, t) {
	let s;
	return () => {
		if (s === void 0) {
			const n = it(e);
			s = t ? n : Qt(n);
		}
		return s;
	};
}
function ct(e, t, s, n) {
	if (w !== null) {
		s !== null && V(s, !1);
		const i = w;
		if (i !== null) return e ? i : i[0];
	}
	return t ? Zt(n(), !0) : document.importNode(n(), !0);
}
function un(e, t, s) {
	return ct(!1, t, e, s);
}
function _n(e, t, s) {
	return ct(!0, t, e, s);
}
const dn = ft(' ', !1),
	hn = ft('<!>', !0);
function Bn(e) {
	return un(e, !0, dn);
}
function Mn(e) {
	return _n(e, !0, hn);
}
function at(e, t, s) {
	const n = Ae,
		i = t ? (T(e) ? e : Array.from(e.childNodes)) : e;
	s !== null && w === null && se(i, null, s), (n.d = i);
}
function zn(e, t) {
	at(t, !1, e);
}
function Rn(e, t) {
	at(t, !0, e);
}
function Kn(e, t, s, n, i) {
	const l = { capture: n, passive: i },
		r = s;
	t.addEventListener(e, r, l),
		(t === document.body || t === window || t === document) &&
			b(() => () => {
				t.removeEventListener(e, r, l);
			});
}
function Pn(e, t) {
	const s = e.__className,
		n = yn(t),
		i = w !== null;
	i && e.className === n
		? (e.__className = n)
		: (s !== n || (i && e.className !== n)) &&
			(n === '' ? e.removeAttribute('class') : en(e, n), (e.__className = n));
}
function Dn(e, t) {
	b(() => pn(e, t()));
}
function pn(e, t) {
	const s = e.__nodeValue,
		n = ut(t);
	w !== null && e.nodeValue === n
		? (e.__nodeValue = n)
		: s !== n && ((e.nodeValue = n), (e.__nodeValue = n));
}
function vn(e, t) {
	if (t) {
		const s = document.body;
		(e.autofocus = !0),
			b(
				() => {
					document.activeElement === s && e.focus();
				},
				Ae,
				!0,
				!1
			);
	}
}
function yn(e) {
	return e ?? '';
}
function $n(e, t, s) {
	s ? e.classList.add(t) : e.classList.remove(t);
}
function Hn(e, t, s) {
	e.addEventListener('input', () => {
		let n = e.value;
		De(e) && (n = $e(n)), s(n);
	}),
		b(() => {
			const n = t();
			(e.__value = n), !(De(e) && n === $e(e.value)) && (e.value = ut(n));
		});
}
function De(e) {
	const t = e.type;
	return t === 'number' || t === 'range';
}
function $e(e) {
	return e === '' ? null : +e;
}
function Vn(e, t, s) {
	$(() => {
		t(e),
			b(() => () => {
				b(() => {
					$(() => {
						(!Mt(s) || s.v === e) && t(null);
					});
				});
			});
	});
}
function gn(e) {
	for (let t = 0; t < e.length; t++) ot.add(e[t]);
	for (const t of be) t(e);
}
function He(e, t) {
	const s = t.type,
		n = t.composedPath?.() || [];
	let i = n[0] || t.target;
	t.target !== i && le(t, 'target', { configurable: !0, value: i });
	let l = 0;
	const r = t.__root;
	if (r) {
		const _ = n.indexOf(r);
		if (_ !== -1 && e === document) return;
		_ < n.indexOf(e) && (l = _);
	}
	for (
		i = n[l] || t.target,
			le(t, 'currentTarget', {
				configurable: !0,
				get() {
					return i || document;
				}
			});
		i !== null;

	) {
		const _ = i.parentNode || i.host || null,
			o = '__' + s,
			f = i[o];
		if (f !== void 0 && !i.disabled)
			if (T(f)) {
				const [a, ...c] = f;
				a.apply(i, [t, ...c]);
			} else f.call(i, t);
		if (t.cancelBubble || _ === e) break;
		i = _;
	}
	t.__root = e;
}
function jn(e, t, s, n) {
	V(e), t === void 0 ? n !== null && n(e) : t(e, s);
}
function qn(e, t, s, n) {
	const i = At();
	V(e);
	const l = w;
	let r = null,
		_ = null,
		o = !1,
		f = !1;
	const a = b(
			() => {
				const v = !!t();
				if (i.v !== v || !o) {
					if (((i.v = v), o)) {
						const d = i.c,
							g = i.a;
						v
							? (g === null || g.size === 0 ? S(u) : O(g, 'out'),
								d === null || d.size === 0 ? S(c) : O(d, 'in'))
							: (d === null || d.size === 0 ? S(c) : O(d, 'out'),
								g === null || g.size === 0 ? S(u) : O(g, 'in'));
					} else if (w !== null) {
						const d = w?.[0]?.data;
						!d || (d === 'ssr:if:true' && !v) || (d === 'ssr:if:false' && v)
							? (E(w), L(null))
							: w.shift();
					}
					o = !0;
				}
			},
			i,
			!1
		),
		c = b(
			() => {
				r !== null && (E(r), (r = null)),
					i.v && (s(e), f || (L(l), (f = !0))),
					(r = i.d),
					(i.d = null);
			},
			i,
			!0
		);
	i.ce = c;
	const u = b(
		() => {
			_ !== null && (E(_), (_ = null)),
				i.v || (n !== null && n(e), f || (L(l), (f = !0))),
				(_ = i.d),
				(i.d = null);
		},
		i,
		!0
	);
	(i.ae = u),
		G(a, () => {
			r !== null && E(r), _ !== null && E(_), N(c), N(u);
		}),
		(i.e = a);
}
function Wn(e) {
	const t = kt(),
		s = w !== null ? H(document.head.firstChild) : null,
		n = w;
	L(s);
	try {
		const i = b(
			() => {
				const l = t.d;
				l !== null && (E(l), (t.d = null));
				let r = null;
				w === null && ((r = ae()), document.head.appendChild(r)), e(r);
			},
			t,
			!1
		);
		G(i, () => {
			const l = t.d;
			l !== null && E(l);
		}),
			(t.e = i);
	} finally {
		L(n);
	}
}
function Yn(e, t, s) {
	const n = zt();
	let i = null;
	V(e);
	let l = null;
	n.r = (f) => {
		const a = i,
			c = a.s;
		c.add(f),
			f.f(() => {
				c.delete(f),
					c.size === 0 &&
						a.e !== null &&
						(a.d !== null && (E(a.d), (a.d = null)), N(a.e), (a.e = null));
			});
	};
	const r = () => {
			const f = { d: null, e: null, s: new Set(), p: i },
				a = b(
					() => {
						const c = n.d;
						c !== null && (E(c), (n.d = null)), l && s(l), (f.d = n.d), (n.d = null);
					},
					n,
					!0
				);
			(f.e = a), (i = f);
		},
		_ = () => {
			const f = i;
			if (f === null) {
				r();
				return;
			}
			const a = f.s;
			a.size === 0
				? (f.d !== null && (E(f.d), (f.d = null)), f.e ? S(f.e) : r())
				: (r(), O(a, 'out'));
		},
		o = b(
			() => {
				const f = t();
				l !== f && ((l = f), _());
			},
			n,
			!1
		);
	G(o, () => {
		let f = i;
		for (; f !== null; ) {
			const a = f.d;
			a !== null && E(a);
			const c = f.e;
			c !== null && N(c), (f = f.p);
		}
	}),
		(n.e = o);
}
function ut(e) {
	return typeof e == 'string' ? e : e == null ? '' : e + '';
}
function Fn(e, t, s) {
	let n, i;
	const l = b(() => {
		i !== (i = t()) && (n && E(n), (n = tn(e, i, s)));
	});
	G(l, () => {
		n && E(n);
	});
}
function Un(e, t, s, n = !1) {
	rt(e, t, s, 'in', n);
}
function Gn(e, t, s, n = !1) {
	rt(e, t, s, 'out', n);
}
function Xn(e, t, s) {
	let n;
	re(() => {
		if (s) {
			const i = s();
			$(() => {
				if (n === void 0) n = t(e, i) || {};
				else {
					const l = n.update;
					typeof l == 'function' && l(i);
				}
			});
		} else $(() => (n = t(e)));
	}),
		re(() => {
			if (n !== void 0) {
				const i = n.destroy;
				if (typeof i == 'function')
					return () => {
						i();
					};
			}
		});
}
function Jn(e) {
	w !== null && (fe(e, 'value', null), fe(e, 'checked', null));
}
function Zn(e, t, s) {
	b(() => {
		const n = s();
		fe(e, t, n);
	});
}
function fe(e, t, s) {
	(s = s == null ? null : s + ''),
		(w === null || (e.getAttribute(t) !== s && t !== 'src' && t !== 'href' && t !== 'srcset')) &&
			(s === null ? e.removeAttribute(t) : e.setAttribute(t, s));
}
function Qn(e, t, s, n) {
	const i = e.style,
		l = i.getPropertyValue(t);
	s == null
		? l !== '' && i.removeProperty(t)
		: l !== s && i.setProperty(t, s, n ? 'important' : '');
}
const mn = ['width', 'height'],
	Ve = new Map();
function wn(e) {
	const t = [],
		s = Rt(e.__proto__);
	for (const n in s) s[n].set && !mn.includes(n) && t.push(n);
	return t;
}
function es(e, t, s, n) {
	let i;
	b(() => {
		i = xn(e, i, t(), s, n);
	});
}
function xn(e, t, s, n, i) {
	const l = Fe({}, ...s),
		r = i.length !== 0;
	for (const o in t) o in l || (l[o] = null);
	r && !l.class && (l.class = '');
	let _ = xe(Ve, e.nodeName);
	_ || nt(Ve, e.nodeName, (_ = wn(e)));
	for (const o in l) {
		let f = l[o];
		if (f === t?.[o]) continue;
		const a = o[0] + o[1];
		if (a !== '$$')
			if (a === 'on') {
				const c = {};
				let u = o.slice(2);
				const v = Kt.includes(u);
				u.endsWith('capture') &&
					u !== 'ongotpointercapture' &&
					u !== 'onlostpointercapture' &&
					((u = u.slice(0, -7)), (c.capture = !0)),
					!v && t?.[o] && e.removeEventListener(u, t[o], c),
					f != null && (v ? ((e[`__${u}`] = f), gn([u])) : e.addEventListener(u, f, c));
			} else if (f == null) e.removeAttribute(o);
			else if (o === 'style') e.style.cssText = f + '';
			else if (o === 'autofocus') vn(e, !!f);
			else if (o === '__value' || o === 'value') e.value = e[o] = e.__value = f;
			else {
				let c = o;
				n && ((c = c.toLowerCase()), (c = Nt[c] || c)),
					_.includes(c)
						? (w === null || (e[c] !== f && c !== 'src' && c !== 'href' && c !== 'srcset')) &&
							(e[c] = f)
						: typeof f != 'function' &&
							(r && c === 'class' && (f && (f += ' '), (f += i)), fe(e, c, f));
			}
	}
	return l;
}
const En = {
	get(e, t) {
		if (!e.exclude.includes(t)) return e.props[t];
	},
	getOwnPropertyDescriptor(e, t) {
		if (!e.exclude.includes(t) && t in e.props)
			return { enumerable: !0, configurable: !0, value: e.props[t] };
	},
	has(e, t) {
		return e.exclude.includes(t) ? !1 : t in e.props;
	},
	ownKeys(e) {
		const t = [];
		for (let s in e.props) e.exclude.includes(s) || t.push(s);
		return t;
	}
};
function ts(e, t) {
	return new Proxy({ props: e, exclude: t }, En);
}
const bn = {
	get(e, t) {
		let s = e.props.length;
		for (; s--; ) {
			let n = e.props[s];
			if ((Q(n) && (n = n()), typeof n == 'object' && n !== null && t in n)) return n[t];
		}
	},
	getOwnPropertyDescriptor(e, t) {
		let s = e.props.length;
		for (; s--; ) {
			let n = e.props[s];
			if ((Q(n) && (n = n()), typeof n == 'object' && n !== null && t in n)) return z(n, t);
		}
	},
	has(e, t) {
		for (let s of e.props) if ((Q(s) && (s = s()), t in s)) return !0;
		return !1;
	},
	ownKeys(e) {
		const t = [];
		for (let s of e.props) {
			Q(s) && (s = s());
			for (const n in s) t.includes(n) || t.push(n);
		}
		return t;
	}
};
function ns(...e) {
	return new Proxy({ props: e }, bn);
}
function ss(e, t) {
	const s = Y(t.props || {}, !1);
	let [n, i] = _t(e, { ...t, props: s });
	const l = {
		$set: (r) => {
			Fe(s, r);
		},
		$destroy: i
	};
	for (const r of Lt(n || {}))
		le(l, r, {
			get() {
				return n[r];
			},
			set(_) {
				Pt(() => (n[r] = _));
			},
			enumerable: !0
		});
	return l;
}
function _t(e, t) {
	Jt();
	const s = new Set(),
		n = t.target,
		i = St(t.intro || !1),
		l = n.firstChild,
		r = H(l),
		_ = w;
	let o;
	try {
		let u = null;
		r === null && ((u = ae()), n.appendChild(u)), L(r);
		const v = b(
			() => {
				t.context && (Ot({}), (Tt.c = t.context)),
					(o = e(u, t.props || {}, t.events || {})),
					t.context && It();
			},
			i,
			!0
		);
		i.e = v;
	} catch (u) {
		if (t.recover !== !1 && r !== null)
			return (
				console.error('ERR_SVELTE_HYDRATION_MISMATCH', u),
				E(r),
				l.remove(),
				r.at(-1)?.nextSibling?.remove(),
				_t(e, t)
			);
		throw u;
	} finally {
		L(_);
	}
	const f = He.bind(null, n),
		a = He.bind(null, document),
		c = (u) => {
			for (let v = 0; v < u.length; v++) {
				const d = u[v];
				s.has(d) ||
					(s.add(d),
					n.addEventListener(d, f, Be.includes(d) ? { passive: !0 } : void 0),
					document.addEventListener(d, a, Be.includes(d) ? { passive: !0 } : void 0));
			}
		};
	return (
		c(Bt(ot)),
		be.add(c),
		[
			o,
			() => {
				for (const v of s) n.removeEventListener(v, f);
				be.delete(c);
				const u = i.d;
				u !== null && E(u), r !== null && E(r), N(i.e);
			}
		]
	);
}
function is(e) {
	for (const t in e) e[t];
}
function ls(e, t, s) {
	const n = Dt();
	b(() => {
		const i = e();
		return (
			$(() => i(t, s)),
			() => {
				n.d !== null && E(n.d);
			}
		);
	}, n);
}
const Ce = -1,
	ve = 99999999,
	dt = -2;
function Cn() {}
function ht(e, t, s, n, i, l, r) {
	const _ = (s & P) !== 0,
		o = Ht(s, e);
	let f = null;
	V(e, _);
	let a,
		c = null,
		u = null;
	o.r = (p) => {
		const y = f,
			h = y.s;
		h.add(p),
			p.f(() => {
				h.delete(p),
					h.size === 0 &&
						y.e !== null &&
						(y.d !== null && (E(y.d), (y.d = null)), N(y.e), (y.e = null));
			});
	};
	const v = () => {
			const p = { d: null, e: null, s: new Set(), p: f },
				y = b(
					() => {
						const h = o.d;
						h !== null && (E(h), (o.d = null));
						let m = o.a;
						(o.f & P) !== 0 && ((m = ae()), o.a.appendChild(m)), l(m), (p.d = o.d), (o.d = null);
					},
					o,
					!0
				);
			(p.e = y), (f = p);
		},
		d = (p) => {
			const y = p.f,
				h = (y & P) !== 0,
				m = p.a;
			r(a, p, m, h, i, y, !0, c);
		},
		g = b(
			() => {
				const p = t();
				(a = T(p) ? p : p == null ? [] : Array.from(p)),
					n !== null ? (c = a.map(n)) : s & Ue || a.map(Cn);
				const y = a.length;
				if (l !== null) {
					if (y === 0) {
						if (o.v.length !== 0 || u === null) {
							d(o), v();
							return;
						}
					} else if (o.v.length === 0 && f !== null) {
						const h = f,
							m = h.s;
						m.size === 0 ? h.d !== null && (E(h.d), (h.d = null)) : O(m, 'out');
					}
				}
				u !== null && S(u);
			},
			o,
			!1
		);
	(u = b(d, o, !0)),
		G(g, () => {
			const p = o.f,
				y = o.a,
				h = (p & P) !== 0;
			let m = f;
			for (; m !== null; ) {
				const C = m.d;
				C !== null && E(C);
				const A = m.e;
				A !== null && N(A), (m = m.p);
			}
			r([], o, y, h, i, p, !1, c), N(u);
		}),
		(o.e = g);
}
function rs(e, t, s, n, i, l) {
	ht(e, t, s, n, i, l, kn);
}
function os(e, t, s, n, i) {
	ht(e, t, s, null, n, i, An);
}
function An(e, t, s, n, i, l, r) {
	var _ = k in e && e[k].i,
		o = t.v,
		f = t.s;
	_ && (l &= ~ce);
	var a = o.length,
		c = e.length,
		u = Math.max(a, c),
		v = 0,
		d,
		g;
	if ((f.length !== 0 && pt(f), c === 0))
		for (d = [], n && a !== 0 && st(s); v < u; ) (g = o[v++]), R(g, f, r, n);
	else {
		var p;
		if (((d = Array(c)), w !== null))
			for (var y = w[0]; v < u; v++) {
				p = _ ? Me(e, v) : e[v];
				var h = H(y);
				L(h), (y = h.at(-1).nextSibling.nextSibling), (g = D(p, null, v, i, l)), (d[v] = g);
			}
		else
			for (; v < u; v++)
				v >= a
					? ((p = _ ? Me(e, v) : e[v]), (g = D(p, null, v, i, l)), (d[v] = g), ie(g, s, n, null))
					: v >= c
						? ((g = o[v]), R(g, f, r))
						: ((p = e[v]), (g = o[v]), (d[v] = g), F(g, p, v, l));
	}
	t.v = d;
}
function kn(e, t, s, n, i, l, r, _) {
	var o = t.v;
	const f = _ !== null;
	var a = t.s,
		c = o.length,
		u = e.length,
		v,
		d;
	if ((a.length !== 0 && pt(a), u === 0))
		for (v = [], n && c !== 0 && st(s); c > 0; ) (d = o[--c]), R(d, a, r, n);
	else {
		var g = c - 1,
			p = u - 1,
			y,
			h,
			m;
		if (((v = Array(u)), w !== null))
			for (var C, A = w[0]; u > 0; )
				(m = p - --u),
					(h = e[m]),
					(y = f ? _[m] : h),
					(C = H(A)),
					L(C),
					(A = (C.at(-1) || A).nextSibling.nextSibling),
					(d = D(h, y, m, i, l)),
					(v[m] = d);
		else if (c === 0)
			for (; u > 0; )
				(m = p - --u),
					(h = e[m]),
					(y = f ? _[m] : h),
					(d = D(h, y, m, i, l)),
					(v[m] = d),
					ie(d, s, n, null);
		else {
			var I = (l & ge) !== 0,
				ue = (l & (ce | ke)) !== 0 || I,
				x = 0,
				j = null;
			(h = e[p]), (y = f ? _[p] : h);
			e: for (;;) {
				for (; o[g].k === y; ) {
					if (
						((d = o[g--]),
						(h = e[p]),
						ue && F(d, h, p, l),
						(j = je(d)),
						(v[p] = d),
						x > --p || x > g)
					)
						break e;
					y = f ? _[p] : h;
				}
				for (h = e[x], y = f ? _[x] : h; x <= g && x <= p && o[x].k === y; )
					(h = e[x]), (d = o[x]), ue && F(d, h, x, l), (v[x] = d), ++x, (y = f ? _[x] : e[x]);
				break;
			}
			if (x > g)
				for (; p >= x; )
					(h = e[p]),
						(y = f ? _[p] : h),
						(d = D(h, y, p, i, l)),
						(v[p--] = d),
						(j = ie(d, s, n, j));
			else if (x > p) {
				u = x;
				do (d = o[u++]) !== null && R(d, a, r);
				while (u <= g);
			} else {
				var X = 0,
					q = p - x + 1,
					J = new Int32Array(q),
					_e = new Map();
				for (u = 0; u < q; ++u)
					(c = u + x), (J[u] = Ce), (h = e[c]), (y = f ? _[c] : h), nt(_e, y, c);
				if (I)
					for (u = x; u <= g; ++u)
						(c = xe(_e, o[u].k)), c !== void 0 && ((h = e[c]), (d = o[u]), F(d, h, c, l));
				for (u = x; u <= g; ++u)
					(c = xe(_e, o[u].k)),
						(d = o[u]),
						c !== void 0
							? ((X = X < c ? c : ve), (J[c - x] = u), (v[c] = d))
							: d !== null && R(d, a, r);
				X === ve && Nn(J);
				for (var de, Se, he; q-- > 0; )
					(p = q + x),
						(c = J[q]),
						(he = c === -1),
						(h = e[p]),
						he
							? ((y = f ? _[p] : h), (d = D(h, y, p, i, l)))
							: ((d = v[p]), !I && ue && F(d, h, p, l)),
						(he || (X === ve && c !== dt)) &&
							((Se = de === void 0 ? j : je(de)), (j = ie(d, s, n, Se))),
						(v[p] = d),
						(de = d);
			}
		}
	}
	t.v = v;
}
function Nn(e) {
	for (
		var t = e.length, s = new Int32Array(t), n = new Int32Array(t), i = 0, l = 0, r, _, o, f;
		e[l] === Ce;
		++l
	);
	for (n[0] = l++; l < t; ++l)
		if (((_ = e[l]), _ !== Ce))
			if (((r = n[i]), e[r] < _)) (s[l] = r), (n[++i] = l);
			else {
				for (o = 0, f = i; o < f; ) (r = (o + f) >> 1), e[n[r]] < _ ? (o = r + 1) : (f = r);
				_ < e[n[o]] && (o > 0 && (s[l] = n[o - 1]), (n[o] = l));
			}
	for (r = n[i]; i-- >= 0; ) (e[r] = dt), (r = s[r]);
}
function ie(e, t, s, n) {
	var i = e.d;
	return n === null ? (s ? se(i, t, null) : se(i, t.parentNode, t)) : se(i, null, n);
}
function je(e) {
	var t = e.d;
	return T(t) ? t[0] : t;
}
function pt(e) {
	var t = e.length;
	if (t > 0) {
		for (var s = 0, n, i; s < t; s++)
			(n = e[s]), (i = n.r), i !== null && ((n.r = null), R(n, null, !1));
		e.length = 0;
	}
}
function Ln(e) {
	const t = e.d;
	if (T(t))
		for (let s = 0; s < t.length; s++) {
			const n = t[s];
			if (n.nodeType !== 8) return n;
		}
	return t;
}
function F(e, t, s, n) {
	n & ce ? ze(e.v, t) : $t(e.v) && (e.v.o[e.v.p] = t);
	const i = e.s,
		l = (n & ke) !== 0,
		r = e.a;
	i !== null && n & Ue && r !== null && r(e, i), l ? ze(e.i, s) : (e.i = s);
}
function R(e, t, s, n = !1) {
	const i = e.s;
	if (s && i !== null) {
		for (let r of i) r.r === 'key' && i.delete(r);
		if (i.size === 0) e.s = null;
		else {
			O(i, 'out'), t !== null && t.push(e);
			return;
		}
	}
	const l = e.d;
	!n && l !== null && E(l), N(e.e);
}
function D(e, t, s, n, i) {
	const r = (i & ce) === 0 ? e : i & jt ? U(e) : ye(e),
		_ = i & ke ? U(s) : s,
		o = Vt(r, _, t),
		f = b(
			(a) => {
				n(null, a.v, a.i);
			},
			o,
			!0
		);
	return (o.e = f), o;
}
const Sn = '5';
typeof window < 'u' && (window.__svelte ||= { v: new Set() }).v.add(Sn);
export {
	Xt as $,
	fe as A,
	ls as B,
	Zn as C,
	ts as D,
	Fn as E,
	es as F,
	is as G,
	gn as H,
	Qn as I,
	ns as J,
	Pn as K,
	jn as L,
	$n as M,
	rs as N,
	Qt as a,
	Tn as b,
	Rn as c,
	ft as d,
	zn as e,
	un as f,
	os as g,
	Wn as h,
	ut as i,
	qn as j,
	Dn as k,
	ss as l,
	Yn as m,
	Mn as n,
	_n as o,
	Y as p,
	Bn as q,
	Vn as r,
	In as s,
	pn as t,
	Jn as u,
	Xn as v,
	Hn as w,
	Kn as x,
	Un as y,
	Gn as z
};
