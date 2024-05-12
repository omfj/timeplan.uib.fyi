import data from '$lib/courses/data.json';
import type { Course } from '$lib/courses/data';

const courses = data as Array<Course>;

export { courses };
