import { browser } from '$app/environment';
import url from './data.json?url';

export type Course = {
	id: string;
	name: string;
	ownerid: string;
	showtype: boolean;
	detailtype: string;
	name_en: string;
	name_nn: string;
	coursetype: string;
	tpsort: string | null;
	showdiscipline: boolean;
	campusid: string | null;
	yearfrom_und: number;
	seasonfrom_und: string;
	yearto_und: number | null;
	seasonto_und: string | null;
	yearfrom_ex: number;
	seasonfrom_ex: string;
	yearto_ex: number | null;
	seasonto_ex: string | null;
	departmentid_secondary: string;
	create_activity_zoom: boolean;
	authorized_netgroups: string | null;
	tpn_copy_daytime: string | null;
	tpn_discipline: boolean;
	tpn_actt_type: boolean;
	nofterms: number;
	terminnr: string;
	recording_folder: string | null;
	fullname: string;
	fullname_en: string;
	fullname_nn: string;
	idtermin: string;
};

export let local: Array<Course>;

if (browser) {
	fetch(url).then(async (request) => {
		local = (await request.json()) as Array<Course>;
	});
}

export function search(courses: Array<Course>, query: string | null) {
	const results: Array<Course> = [];
	if (!query) return results;

	const q = query.toLowerCase().trim();

	for (const course of courses) {
		if (course.name.toLowerCase().includes(q) || course.id.toLowerCase().includes(q)) {
			results.push(course);

			if (results.length === 200) break;
		}
	}

	results.sort((a, b) => {
		const ai = a.id.toLowerCase().indexOf(q);
		const bi = b.id.toLowerCase().indexOf(q);

		if (ai === -1) return 1;
		if (bi === -1) return -1;

		return ai - bi || a.id.length - b.id.length;
	});

	return results.slice(0, 5);
}
