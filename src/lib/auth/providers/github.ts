import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '$env/static/private';
import { GitHub } from 'arctic';
import { baseURL } from '../../utils';

export const github = new GitHub(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, {
	redirectURI: `${baseURL}/auth/github/callback`
});

export type GitHubUser = {
	id: number;
	login: string;
	email: string;
	name: string | null;
};

export const getGitHubUser = async (accessToken: string): Promise<GitHubUser> => {
	const response = await fetch('https://api.github.com/user', {
		headers: {
			Authorization: `Bearer ${accessToken}`,
			'User-Agent': 'uib.fyi/1.0'
		}
	});

	return (await response.json()) as GitHubUser;
};
