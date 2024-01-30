import { isSameDay } from 'date-fns';

type Dateable = Date | string | number;

export const formatDate = (date: Dateable) => {
	const d = new Date(date);
	d.setHours(d.getHours() - 1);

	return d.toLocaleDateString('no-NB', {
		weekday: 'long',
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		hour: 'numeric',
		minute: 'numeric'
	});
};

export const time = (date: Dateable) => {
	const d = new Date(date);
	d.setHours(d.getHours() - 1);

	return d.toLocaleTimeString('no-NB', {
		hour: 'numeric',
		minute: 'numeric'
	});
};

export const date = (date: Dateable) => {
	const d = new Date(date);
	d.setHours(d.getHours() - 1);

	return d.toLocaleDateString('no-NB', {
		weekday: 'short',
		day: 'numeric',
		month: 'long'
	});
};
export const getYearAndSemester = (date: Date) => {
	const year = `${date.getFullYear()}`.slice(2);
	const semester = date.getMonth() < 6 ? 'v' : 'h';
	return `${year}${semester}`;
};

export const formatFromTo = (from: Dateable, to: Dateable) => {
	if (isSameDay(from, to)) {
		return `${date(from)}, kl ${time(from)} - ${time(to)}`;
	}

	return `${formatDate(from)} - ${formatDate(to)}`;
};
