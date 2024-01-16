import { p as f, i as h, a as y } from './entry.WxN5ThT0.js';
function A(t) {
	const r = JSON.parse(t);
	return r.data && (r.data = f(r.data)), r;
}
function d(t) {
	return HTMLElement.prototype.cloneNode.call(t);
}
function L(t, r = () => {}) {
	const c = async ({ action: e, result: s, reset: o = !0, invalidateAll: i = !0 }) => {
		s.type === 'success' && (o && HTMLFormElement.prototype.reset.call(t), i && (await h())),
			(location.origin + location.pathname === e.origin + e.pathname ||
				s.type === 'redirect' ||
				s.type === 'error') &&
				y(s);
	};
	async function l(e) {
		if ((e.submitter?.hasAttribute('formmethod') ? e.submitter.formMethod : d(t).method) !== 'post')
			return;
		e.preventDefault();
		const o = new URL(
				e.submitter?.hasAttribute('formaction') ? e.submitter.formAction : d(t).action
			),
			i = new FormData(t),
			u = e.submitter?.getAttribute('name');
		u && i.append(u, e.submitter?.getAttribute('value') ?? '');
		const p = new AbortController();
		let m = !1;
		const b =
			(await r({
				action: o,
				cancel: () => (m = !0),
				controller: p,
				formData: i,
				formElement: t,
				submitter: e.submitter
			})) ?? c;
		if (m) return;
		let n;
		try {
			const a = await fetch(o, {
				method: 'POST',
				headers: { accept: 'application/json', 'x-sveltekit-action': 'true' },
				cache: 'no-store',
				body: i,
				signal: p.signal
			});
			(n = A(await a.text())), n.type === 'error' && (n.status = a.status);
		} catch (a) {
			if (a?.name === 'AbortError') return;
			n = { type: 'error', error: a };
		}
		b({
			action: o,
			formData: i,
			formElement: t,
			update: (a) => c({ action: o, result: n, reset: a?.reset, invalidateAll: a?.invalidateAll }),
			result: n
		});
	}
	return (
		HTMLFormElement.prototype.addEventListener.call(t, 'submit', l),
		{
			destroy() {
				HTMLFormElement.prototype.removeEventListener.call(t, 'submit', l);
			}
		}
	);
}
export { L as e };
