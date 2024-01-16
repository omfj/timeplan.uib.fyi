import {
	z as create_anchor,
	M as ensure_array_like,
	R as head,
	O as escape,
	G as escape_text,
	N as unsubscribe_stores,
	x as bind_props,
	y as pop,
	L as store_get,
	t as push
} from '../../../../chunks/index3.js';
import { p as page } from '../../../../chunks/stores.js';
import { f as format } from '../../../../chunks/date.js';
const formatCourse = (course, strategy) => {
	if (strategy === 'week') {
		return formatCourseWeek(course);
	}
	return formatCourseWeek(course);
};
const formatCourseWeek = (course) => {
	const weeks = {};
	course.forEach((c) => {
		const week = c.week;
		if (!weeks[week]) {
			weeks[week] = [];
		}
		weeks[week]?.push(c);
	});
	return weeks;
};
function _page($$payload, $$props) {
	push(true);
	const $$store_subs = {};
	let { data } = $$props;
	const weeks = formatCourse(data.course, 'week');
	const anchor = create_anchor($$payload);
	const each_array = ensure_array_like(Object.keys(weeks));
	head($$payload, ($$payload2) => {
		$$payload2.title = '<title>';
		$$payload2.title += `${escape(store_get($$store_subs, '$page', page).params['code'])} - Timeplan</title>`;
	});
	$$payload.out += `<div class="bg-white border-2 border-black p-8 rounded-[36px] space-y-8"><div class="space-y-2"><h2 class="text-2xl font-bold">Timeplan</h2> ${anchor}`;
	for (let $$index_1 = 0; $$index_1 < each_array.length; $$index_1++) {
		const week = each_array[$$index_1];
		const anchor_1 = create_anchor($$payload);
		const anchor_2 = create_anchor($$payload);
		const anchor_3 = create_anchor($$payload);
		const each_array_1 = ensure_array_like(weeks[week]);
		$$payload.out += `${anchor_1}${anchor_2}`;
		if (weeks[week].length > 0) {
			$$payload.out += '<!--ssr:if:true-->';
			$$payload.out += `<h2 class="text-2xl font-medium my-3 underline">Uke ${escape(week)}</h2>`;
		} else {
			$$payload.out += '<!--ssr:if:false-->';
		}
		$$payload.out += `${anchor_2} <ul class="flex flex-col divide-y">${anchor_3}`;
		for (let $$index = 0; $$index < each_array_1.length; $$index++) {
			const event = each_array_1[$$index];
			const anchor_4 = create_anchor($$payload);
			const anchor_5 = create_anchor($$payload);
			$$payload.out += `${anchor_4}<li class="py-2"><h3 class="text-xl font-medium">${escape_text(event.title)}</h3> <p>Fra: ${escape(format(event.startTime))}</p> <p>Til: ${escape(format(event.endTime))}</p> <p>Rom: ${escape(event['room'])}</p> ${anchor_5}`;
			if (event.staffs.length > 0) {
				$$payload.out += '<!--ssr:if:true-->';
				$$payload.out += `<p>Fagperson: ${escape(event.staffs.join(', '))}</p>`;
			} else {
				$$payload.out += '<!--ssr:if:false-->';
			}
			$$payload.out += `${anchor_5}</li>${anchor_4}`;
		}
		$$payload.out += `${anchor_3}</ul>${anchor_1}`;
	}
	$$payload.out += `${anchor}</div></div>`;
	unsubscribe_stores($$store_subs);
	bind_props($$props, { data });
	pop();
}
export { _page as default };
