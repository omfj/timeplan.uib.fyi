import { s as setContext, g as getContext } from './main-client.js';
const USER_CTX_KEY = 'user_ctx';
const setUserContext = (user) => {
	const u = user;
	setContext(USER_CTX_KEY, u);
	return u;
};
const getUserContext = () => {
	return getContext(USER_CTX_KEY);
};
export { getUserContext as g, setUserContext as s };
