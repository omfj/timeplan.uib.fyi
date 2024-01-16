import {
	e as h,
	t as l,
	f as _,
	s as a,
	d as g,
	a as s
} from '../chunks/disclose-version.kdlgi_eV.js';
import { r as u, p as k, a as y } from '../chunks/runtime.zBIj1Mfk.js';
import { g as w } from '../chunks/user.svelte.VqRhIZH3.js';
var B = g(
	'<div class="bg-white border-2 border-black p-8 space-y-6 rounded-[36px]"><h1 class="text-3xl font-black mb-5">Din profil</h1> <div class="space-y-2"><h2 class="text-xl font-black">Bruker</h2> <div><p class="text-xl"><span class="font-bold">Navn:</span> </p> <p class="text-xl"><span class="font-bold">E-post:</span> </p></div></div></div>'
);
function N(e, o) {
	y(o, !1);
	let t = w();
	var r = _(e, !0, B),
		v = s(r),
		n = a(a(v)),
		i = s(n),
		d = a(a(i)),
		p = s(d),
		c = s(p),
		f = a(c),
		x = a(a(p)),
		m = s(x),
		b = a(m);
	u(() => {
		l(f, t?.name), l(b, t?.email);
	}),
		h(e, r),
		k();
}
export { N as component };
