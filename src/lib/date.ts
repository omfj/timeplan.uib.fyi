// https://www.epochconverter.com/weeknumbers
export const getWeek = () => {
	const target = new Date();
	const dayNr = (new Date().getDay() + 6) % 7;

	target.setDate(target.getDate() - dayNr + 3);

	const firstThursday = target.valueOf();

	target.setMonth(0, 1);

	if (target.getDay() != 4) {
		target.setMonth(0, 1 + ((4 - target.getDay() + 7) % 7));
	}

	return 1 + Math.ceil((firstThursday - target.getTime()) / 604800000);
};

export const { format } = Intl.DateTimeFormat('no-NB', {
	weekday: 'long',
	day: 'numeric',
	month: 'long',
	year: 'numeric',
	hour: 'numeric',
	minute: 'numeric'
});
