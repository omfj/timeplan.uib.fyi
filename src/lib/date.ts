import { format, isSameDay } from 'date-fns';
import { nb } from 'date-fns/locale';

export const { format: formatDate } = Intl.DateTimeFormat('no-NB', {
	weekday: 'long',
	day: 'numeric',
	month: 'long',
	year: 'numeric',
	hour: 'numeric',
	minute: 'numeric'
});

export const time = (date: Date) =>
	format(date, 'HH:mm', {
		locale: nb
	});

export const date = (date: Date) => format(date, 'dd.MM.yyyy');

export const getYearAndSemester = (date: Date) => {
	const year = `${date.getFullYear()}`.slice(2);
	const semester = date.getMonth() < 6 ? 'v' : 'h';
	return `${year}${semester}`;
};

export const toOsloTime = (date: Date | string | number): Date =>
	new Date(
		new Date(date).toLocaleString('en-US', {
			timeZone: 'Europe/Oslo'
		})
	);

export const formatFromTo = (from: Date, to: Date) => {
	const fromTime = toOsloTime(from);
	const toTime = toOsloTime(to);

	if (isSameDay(fromTime, toTime)) {
		return `${date(fromTime)}, kl ${time(fromTime)} - ${time(toTime)}`;
	}

	return `${formatDate(fromTime)} - ${formatDate(toTime)}`;
};
