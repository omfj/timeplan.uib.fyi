import { parse } from 'csv-parse';
import { e as error } from '../../../../chunks/index.js';
import { g as getYearAndSemester } from '../../../../chunks/date.js';
const courseMapper = (course) => {
	const startTime = new Date(course.dtstart);
	const endTime = new Date(course.dtend);
	const week = Number(course.weeknr);
	const staffs = course.staffnames
		.split(',')
		.map((name) => name.trim())
		.filter((name) => name !== '');
	const id = course.id;
	const party = Number(course.party);
	const type = course['teaching-method'];
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
const getCourse = async (course, sem, lang) => {
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
	const courses = await new Promise((resolve, reject) => {
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
const load = async ({ params }) => {
	const { code } = params;
	const semesterYear = getYearAndSemester(/* @__PURE__ */ new Date());
	const course = await getCourse(code, semesterYear, 'no');
	if (course.length === 0) {
		throw error(404, 'Finner ikke emnet.');
	}
	return {
		course
	};
};
export { load };
