import type { Course } from './services/get-course';

type Strategy = 'week';

export const groupCourseBy = (course: Array<Course>, strategy: Strategy) => {
	if (strategy === 'week') {
		return formatCourseWeek(course);
	}

	// Default formatter
	return formatCourseWeek(course);
};

const formatCourseWeek = (course: Array<Course>) => {
	const weeks: Record<string, Array<Course>> = {};

	course.forEach((c) => {
		const week = c.week;

		if (!weeks[week]) {
			weeks[week] = [];
		}

		weeks[week]?.push(c);
	});

	return weeks;
};
