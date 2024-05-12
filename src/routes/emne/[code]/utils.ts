import type { Course } from '$lib/services/get-course';

export const getGroupNumber = (group: Course) => {
	if (group?.type === 'GR') {
		return group.party;
	}

	return null;
};

type GroupInfo = {
	id: string;
	show: boolean;
	title: string;
};

export const getGroups = (course: Array<Course>) => {
	const defaultGroups: Array<GroupInfo> = [
		{
			id: 'FOR',
			show: true,
			title: 'Forelesning'
		},
		{
			id: 'ØV',
			show: true,
			title: 'Øving'
		}
	];

	return [
		...defaultGroups,
		...Array.from(
			new Set(
				course
					.map((group) => getGroupNumber(group))
					.filter((group): group is number => group !== null)
					.sort((a, b) => a - b)
			)
		).map((group) => ({
			id: group.toString(),
			show: true,
			title: `Gruppe ${group}`
		}))
	];
};
