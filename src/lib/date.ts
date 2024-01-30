import { isSameDay } from 'date-fns';

export const formatDate = (date: Date | string | number) => {
	const d = new Date(date);

	return d.toLocaleDateString('no-NB', {
		weekday: 'long',
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		hour: 'numeric',
		minute: 'numeric'
	});
};

export const time = (date: Date | string | number) => {
	const d = new Date(date);

	return d.toLocaleTimeString('no-NB', {
		hour: 'numeric',
		minute: 'numeric'
	});
};

export const date = (date: Date | string | number) => {
	const d = new Date(date);

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

export const formatFromTo = (from: Date, to: Date) => {
	if (isSameDay(from, to)) {
		return `${date(from)}, kl ${time(from)} - ${time(to)}`;
	}

	return `${formatDate(from)} - ${formatDate(to)}`;
};
