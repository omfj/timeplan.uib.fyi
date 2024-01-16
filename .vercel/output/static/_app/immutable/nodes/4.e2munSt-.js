import {
	h as K,
	g as C,
	e as u,
	$ as L,
	i as n,
	j as B,
	k as d,
	t as D,
	c as M,
	f,
	s as e,
	o as P,
	b as Q,
	a as t,
	d as p
} from '../chunks/disclose-version.kdlgi_eV.js';
import { u as S, p as V, r as E, a as X, s as Y, e as s } from '../chunks/runtime.zBIj1Mfk.js';
import { p as Z } from '../chunks/stores.tJ5HbWHB.js';
const ee = (o, a) => I(o),
	I = (o) => {
		const a = {};
		return (
			o.forEach((i) => {
				const l = i.week;
				a[l] || (a[l] = []), a[l]?.push(i);
			}),
			a
		);
	},
	{ format: N } = Intl.DateTimeFormat('no-NB', {
		weekday: 'long',
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		hour: 'numeric',
		minute: 'numeric'
	});
var ae = p('<h2 class="text-2xl font-medium my-3 underline"> </h2>'),
	re = p('<p> </p>'),
	te = p(
		'<li class="py-2"><h3 class="text-xl font-medium"> </h3> <p> </p> <p> </p> <p> </p> <!></li>'
	),
	se = p('<!> <ul class="flex flex-col divide-y"></ul>', !0),
	oe = p(
		'<div class="bg-white border-2 border-black p-8 rounded-[36px] space-y-8"><div class="space-y-2"><h2 class="text-2xl font-bold">Timeplan</h2> <!></div></div>'
	);
function pe(o, a) {
	X(a, !0);
	const i = {};
	S(i);
	const l = () => Y(Z, '$page', i),
		m = ee(a.data.course, 'week');
	var g = f(o, !0, oe);
	K((_) => {
		E(() => {
			L.title = `${n(l().params.code)} - Timeplan`;
		});
	});
	var O = t(g),
		R = t(O),
		U = e(e(R));
	C(
		U,
		() => Object.keys(m),
		65,
		(_, v, ne) => {
			var x = P(_, !0, se),
				h = Q(x),
				W = e(e(h));
			B(
				h,
				() => m[s(v)].length > 0,
				(c) => {
					var r = f(c, !0, ae),
						b = t(r);
					d(b, () => `Uke ${n(s(v))}`), u(c, r);
				},
				null
			),
				C(
					W,
					() => m[s(v)],
					73,
					(c, r, b) => {
						var k = f(c, !0, te),
							y = t(k),
							q = t(y),
							w = e(e(y)),
							z = t(w),
							T = e(e(w)),
							A = t(T),
							$ = e(e(T)),
							G = t($),
							H = e(e($));
						d(z, () => `Fra: ${n(N(s(r).startTime))}`),
							d(A, () => `Til: ${n(N(s(r).endTime))}`),
							E(() => {
								D(q, s(r).title), D(G, `Rom: ${n(s(r).room)}`);
							}),
							B(
								H,
								() => s(r).staffs.length > 0,
								(j) => {
									var F = f(j, !0, re),
										J = t(F);
									d(J, () => `Fagperson: ${n(s(r).staffs.join(', '))}`), u(j, F);
								},
								null
							),
							u(c, k);
					},
					null
				),
				M(_, x);
		},
		null
	),
		u(o, g),
		V();
}
export { pe as component };
