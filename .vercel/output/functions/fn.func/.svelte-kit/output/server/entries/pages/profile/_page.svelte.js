import { G as escape_text, y as pop, t as push } from '../../../chunks/index3.js';
import { g as getUserContext } from '../../../chunks/user.svelte.js';
function _page($$payload, $$props) {
	push(false);
	let user = getUserContext();
	$$payload.out += `<div class="bg-white border-2 border-black p-8 space-y-6 rounded-[36px]"><h1 class="text-3xl font-black mb-5">Din profil</h1> <div class="space-y-2"><h2 class="text-xl font-black">Bruker</h2> <div><p class="text-xl"><span class="font-bold">Navn:</span>${escape_text(user?.name)}</p> <p class="text-xl"><span class="font-bold">E-post:</span>${escape_text(user?.email)}</p></div></div></div>`;
	pop();
}
export { _page as default };
