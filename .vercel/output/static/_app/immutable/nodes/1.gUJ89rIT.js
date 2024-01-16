import {
	c as m,
	t as o,
	o as u,
	a as p,
	b as _,
	s as n,
	d
} from '../chunks/disclose-version.kdlgi_eV.js';
import { u as l, r as v, p as b, a as h, s as x } from '../chunks/runtime.zBIj1Mfk.js';
import { p as $ } from '../chunks/stores.tJ5HbWHB.js';
var y = d('<h1> </h1> <p> </p>', !0);
function q(a, f) {
	h(f, !1);
	const s = {};
	l(s);
	const r = () => x($, '$page', s);
	var e = u(a, !0, y),
		t = _(e),
		g = p(t),
		i = n(n(t)),
		c = p(i);
	v(() => {
		o(g, r().status), o(c, r().error?.message);
	}),
		m(a, e),
		b();
}
export { q as component };
