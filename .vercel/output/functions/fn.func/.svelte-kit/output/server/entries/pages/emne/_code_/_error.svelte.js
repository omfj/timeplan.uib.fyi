import {
	G as escape_text,
	L as store_get,
	N as unsubscribe_stores,
	y as pop,
	t as push
} from '../../../../chunks/index3.js';
import { p as page } from '../../../../chunks/stores.js';
function _error($$payload, $$props) {
	push(false);
	const $$store_subs = {};
	$$payload.out += `<div class="bg-white border-2 border-black text-center flex flex-col gap-4 p-8 rounded-[36px]"><h3 class="text-4xl md:text-5xl font-black">${escape_text(store_get($$store_subs, '$page', page).status)}</h3> <p>${escape_text(store_get($$store_subs, '$page', page).error?.message)}</p></div>`;
	unsubscribe_stores($$store_subs);
	pop();
}
export { _error as default };
