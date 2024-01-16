import type { User } from '$lib/db/schemas';
import { getContext, setContext } from 'svelte';

type UserContext = User | null;

export const USER_CTX_KEY = 'user_ctx';

export const setUserContext = (user: User | null) => {
	const u = $state(user);
	setContext<UserContext>(USER_CTX_KEY, u);
	return u;
};

export const getUserContext = () => {
	return getContext<UserContext>(USER_CTX_KEY);
};
