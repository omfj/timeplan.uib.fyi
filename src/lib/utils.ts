import { dev } from '$app/environment';

export const baseURL = dev ? 'http://localhost:5173' : 'https://uib.fyi';

export const unique = <T>(array: Array<T>) => [...new Set(array)];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debounce = <T extends (...args: Array<any>) => any>(func: T, wait: number) => {
	let timeout: ReturnType<typeof setTimeout>;

	return (...args: Parameters<T>): Promise<ReturnType<T>> =>
		new Promise((resolve) => {
			clearTimeout(timeout);
			timeout = setTimeout(() => resolve(func(...args)), wait);
		});
};
