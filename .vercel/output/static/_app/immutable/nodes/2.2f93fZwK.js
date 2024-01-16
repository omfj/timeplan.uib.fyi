import {
	e as f,
	t as p,
	f as x,
	a as e,
	d as m,
	s as c
} from '../chunks/disclose-version.kdlgi_eV.js';
import { u as b, r as g, p as u, a as v, s as _ } from '../chunks/runtime.zBIj1Mfk.js';
import { p as h } from '../chunks/stores.tJ5HbWHB.js';
var $ = m(
	'<div class="bg-white border-2 border-black text-center flex flex-col gap-4 p-8 rounded-[36px]"><h3 class="text-4xl md:text-5xl font-black"> </h3> <p> </p></div>'
);
function j(s, i) {
	v(i, !1);
	const t = {};
	b(t);
	const a = () => _(h, '$page', t);
	var r = x(s, !0, $),
		o = e(r),
		l = e(o),
		n = c(c(o)),
		d = e(n);
	g(() => {
		p(l, a().status), p(d, a().error?.message);
	}),
		f(s, r),
		u();
}
export { j as component };
