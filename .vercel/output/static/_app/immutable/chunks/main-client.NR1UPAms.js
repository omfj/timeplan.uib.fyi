import { b as i, g as s, c as f, i as _, d as l } from './runtime.zBIj1Mfk.js';
function x(t) {
	i(() => {
		const n = f(t);
		if (typeof n == 'function') return n;
	});
}
function v(t) {
	return s().get(t);
}
function g(t, n) {
	return s().set(t, n), n;
}
function m(t, n, { bubbles: e = !1, cancelable: c = !1 } = {}) {
	return new CustomEvent(t, { detail: n, bubbles: e, cancelable: c });
}
function d() {
	const t = l;
	if (t === null)
		throw new Error('createEventDispatcher can only be used during component initialisation.');
	return (n, e, c) => {
		const o = t.s.$$events?.[n];
		if (o) {
			const a = _(o) ? o.slice() : [o],
				r = m(n, e, c);
			for (const u of a) u.call(t.a, r);
			return !r.defaultPrevented;
		}
		return !0;
	};
}
export { d as c, v as g, x as o, g as s };
