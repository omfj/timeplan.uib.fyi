import { dev } from '$app/environment';

export const baseURL = dev ? 'http://localhost:5173' : 'https://uib.fyi';

export const unique = <T>(array: Array<T>) => [...new Set(array)];
