import {
	S as get_or_init_context_map,
	i as is_array,
	f as current_component_context
} from './index3.js';
function getContext(key) {
	const context_map = get_or_init_context_map();
	return (
		/** @type {T} */
		context_map.get(key)
	);
}
function setContext(key, context) {
	const context_map = get_or_init_context_map();
	context_map.set(key, context);
	return context;
}
function create_custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
	return new CustomEvent(type, { detail, bubbles, cancelable });
}
function createEventDispatcher() {
	const component_context = current_component_context;
	if (component_context === null) {
		throw new Error('createEventDispatcher can only be used during component initialisation.');
	}
	return (type, detail, options) => {
		const events =
			/** @type {Record<string, Function | Function[]>} */
			/** @type {any} */
			component_context.s.$$events?.[type];
		if (events) {
			const callbacks = is_array(events) ? events.slice() : [events];
			const event = create_custom_event(
				/** @type {string} */
				type,
				detail,
				options
			);
			for (const fn of callbacks) {
				fn.call(component_context.a, event);
			}
			return !event.defaultPrevented;
		}
		return true;
	};
}
export { createEventDispatcher as c, getContext as g, setContext as s };
