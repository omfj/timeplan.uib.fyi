import { parse } from 'csv-parse';

const courseMapper = (course: CourseData) => {
	const startTime = new Date(course.dtstart);
	const endTime = new Date(course.dtend);
	const week = Number(course.weeknr);
	const staffs = course.staffnames
		.split(',')
		.map((name) => name.trim())
		.filter((name) => name !== '');
	const id = course.id;
	const party = Number(course.party);
	const type = course['teaching-method']; // FOR - ØV - GR
	const room = course.room;
	const title = course['teaching-title'];

	return {
		id,
		title,
		startTime,
		endTime,
		week,
		staffs,
		party,
		type,
		room
	};
};

export type Course = ReturnType<typeof courseMapper>;

export type CourseData = {
	semesterid: string;
	courseid: string;
	courseversion: string;
	'teaching-method': string;
	'teaching-method-name': string;
	'teaching-title': string;
	id: string;
	weeknr: string;
	summary: string;
	dtstart: string;
	dtend: string;
	room: string;
	candidates: string;
	candidates_reg: string;
	notes: string;
	tag: string;
	equipment: string;
	staffs: string;
	active: string;
	examform_no: string;
	examform_nn: string;
	examform_en: string;
	examform_code: string;
	on_premises: string;
	assessment_code: string;
	assessment_time_year: string;
	assessment_time_code: string;
	hidetime: string;
	terminnr: string;
	weekday: string;
	multiday: string;
	staffnames: string;
	allweeks: string;
	followers: string;
	curr: string;
	tags: string;
	party: string;
};

export const getCourse = async (course: string, sem: string, lang: string) => {
	const url = `https://tp.educloud.no/uib/timeplan/excel.php?type=course&id[]=${course.toUpperCase()}%2C1&sort=week&sem=${sem}&lang=${lang}`;

	const myHeaders = new Headers();
	myHeaders.append('Content-Type', 'text/plain; charset=UTF-8');

	const data = await fetch(url, {
		headers: myHeaders
	})
		.then((response) => response.arrayBuffer())
		.then((buffer) => {
			const decoder = new TextDecoder('iso-8859-1');
			const text = decoder.decode(buffer);

			return text;
		});

	const courses = await new Promise<Array<CourseData>>((resolve, reject) => {
		parse(
			data,
			{
				delimiter: ';',
				columns: true,
				skip_empty_lines: true,
				encoding: 'utf-8'
			},
			(err, records) => {
				if (err) {
					reject(err);
				} else {
					resolve(records);
				}
			}
		);
	});

	return courses.map(courseMapper);
};
