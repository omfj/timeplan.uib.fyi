import type { Action } from 'svelte/action';

export const outsideClick: Action<HTMLElement, () => void> = (node, cb) => {
	const handleClick = (event: MouseEvent) => {
		if (node && !node.contains(event.target as Node)) {
			cb();
		}
	};

	document.addEventListener('click', handleClick);

	return {
		destroy: () => {
			document.removeEventListener('click', handleClick);
		}
	};
};
