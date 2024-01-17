import { parse } from 'csv-parse';

const isValidSemesterId = (semesterId: string) => {
	const year = Number(semesterId.slice(0, 2));
	const semester = semesterId.slice(2, 3);

	return (!isNaN(year) && semester === 'h') || semester === 'v';
};

const courseMapper = (course: CourseData) => {
	if (!isValidSemesterId(course.semesterid)) {
		return;
	}

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

export const createCourseUrl = (course: string, sem: string, lang: string) => {
	const url = new URL('https://tp.educloud.no/uib/timeplan/excel.php');
	url.searchParams.append('type', 'course');
	url.searchParams.append('id[]', `${course.toUpperCase()},1`);
	url.searchParams.append('sort', 'week');
	url.searchParams.append('sem', sem);
	url.searchParams.append('lang', lang);

	return url;
};

export const getCourse = async (course: string, sem: string, lang: string) => {
	const url = createCourseUrl(course, sem, lang);

	const headers = new Headers();
	headers.append('Content-Type', 'text/plain; charset=UTF-8');
	headers.append('User-Agent', 'uib.fyi');

	return await fetch(url, {
		headers
	})
		.then((response) => response.arrayBuffer())
		.then((buffer) => {
			const decoder = new TextDecoder('iso-8859-1');
			return decoder.decode(buffer);
		});
};

export const parseCourse = async (course: string) => {
	const records = parse(course, {
		delimiter: ';',
		columns: true,
		skipRecordsWithEmptyValues: true,
		skipEmptyLines: true,
		relaxColumnCountLess: true
	});

	const foo = await new Promise<Array<unknown>>((resolve, reject) => {
		const lines: Array<unknown> = [];

		records.on('data', (record) => {
			lines.push(record);
		});

		records.on('end', () => {
			resolve(lines);
		});

		records.on('error', (error) => {
			reject(error);
		});
	});

	return foo.map((line) => courseMapper(line as CourseData)).filter(Boolean);
};
