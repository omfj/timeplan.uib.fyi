import {
	G as escape_text,
	L as store_get,
	N as unsubscribe_stores,
	y as pop,
	t as push
} from '../../chunks/index3.js';
import { p as page } from '../../chunks/stores.js';
function Error($$payload, $$props) {
	push(false);
	const $$store_subs = {};
	$$payload.out += `<h1>${escape_text(store_get($$store_subs, '$page', page).status)}</h1> <p>${escape_text(store_get($$store_subs, '$page', page).error?.message)}</p>`;
	unsubscribe_stores($$store_subs);
	pop();
}
export { Error as default };
