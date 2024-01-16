export const { format } = Intl.DateTimeFormat('no-NB', {
	weekday: 'long',
	day: 'numeric',
	month: 'long',
	year: 'numeric',
	hour: 'numeric',
	minute: 'numeric'
});

export const getYearAndSemester = (date: Date) => {
	const year = `${date.getFullYear()}`.slice(2);
	const semester = date.getMonth() < 6 ? 'v' : 'h';
	return `${year}${semester}`;
};
