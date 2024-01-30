import { isSameDay } from 'date-fns';
import { DateTime } from 'luxon';

export const formatDate = (date: Date | string | number) => {
	const d = new Date(date);
	return DateTime.fromJSDate(d, { zone: 'Europe/Oslo' }).toFormat('dd. MMMM yyyy, HH:mm');
};

export const time = (date: Date | string | number) => {
	const d = new Date(date);
	return DateTime.fromJSDate(d, { zone: 'Europe/Oslo' }).toFormat('HH:mm');
};

export const date = (date: Date | string | number) => {
	const d = new Date(date);
	return DateTime.fromJSDate(d, { zone: 'Europe/Oslo' }).toFormat('EEEE dd. MMMM');
};
export const getYearAndSemester = (date: Date) => {
	const year = `${date.getFullYear()}`.slice(2);
	const semester = date.getMonth() < 6 ? 'v' : 'h';
	return `${year}${semester}`;
};

export const formatFromTo = (from: Date, to: Date) => {
	if (isSameDay(from, to)) {
		return `${date(from)}, kl ${time(from)} - ${time(to)}`;
	}

	return `${formatDate(from)} - ${formatDate(to)}`;
};
