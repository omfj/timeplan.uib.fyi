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
	return course.reduce(
		(acc, c) => {
			const week = c!.week;

			if (!acc[week]) {
				acc[week] = [];
			}

			acc[week]!.push(c);

			return acc;
		},
		{} as Record<string, Array<Course>>
	);
};
