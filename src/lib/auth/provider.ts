import { github, type GitHubUser } from './providers/github';

const providers = {
	github: github
} as const;

const isProvider = (provider: string): provider is keyof typeof providers => {
	return provider in providers;
};

type GetProviderFn = (provider: string) => {
	name: keyof typeof providers;
	client: (typeof providers)[keyof typeof providers];
} | null;

export const getProvider: GetProviderFn = (provider: string) => {
	if (!isProvider(provider)) return null;
	return {
		name: provider,
		client: providers[provider]
	};
};

export type GetProviderUserFn = (provider: 'github', accessToken: string) => Promise<GitHubUser>;

export const getProivderUser: GetProviderUserFn = async (provider, accessToken) => {
	if (provider === 'github') {
		const response = await fetch('https://api.github.com/user', {
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'User-Agent': 'arctic'
			}
		});

		if (!response.ok) {
			throw new Error(`Failed to fetch user: ${response.status}`);
		}

		return (await response.json()) as GitHubUser;
	}

	throw new Error(`Invalid provider: ${provider}`);
};
