import {
	z as create_anchor,
	A as attr,
	x as bind_props,
	y as pop,
	t as push,
	B as onDestroy,
	C as spread_attributes,
	D as sanitize_props,
	E as value_or_fallback,
	F as add_styles,
	G as escape_text,
	H as spread_props,
	I as merge_styles,
	J as stringify,
	K as slot,
	L as store_get,
	M as ensure_array_like,
	N as unsubscribe_stores,
	O as escape
} from '../../chunks/index3.js';
import '../../chunks/client.js';
import { c as createEventDispatcher } from '../../chunks/main-client.js';
import { g as getUserContext, s as setUserContext } from '../../chunks/user.svelte.js';
import { d as derived, g as get_store_value, w as writable } from '../../chunks/index2.js';
function HeaderItem($$payload, $$props) {
	push(true);
	let { href, children } = $$props;
	const anchor = create_anchor($$payload);
	$$payload.out += `<li><a class="block px-4 py-1 rounded-full border-2 border-black font-bold hover:bg-gray-100"${attr('href', href, false)}>${anchor}`;
	children($$payload);
	$$payload.out += `${anchor}</a></li>`;
	bind_props($$props, { href, children });
	pop();
}
const matchIconName = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const stringToIcon = (value, validate, allowSimpleName, provider = '') => {
	const colonSeparated = value.split(':');
	if (value.slice(0, 1) === '@') {
		if (colonSeparated.length < 2 || colonSeparated.length > 3) {
			return null;
		}
		provider = colonSeparated.shift().slice(1);
	}
	if (colonSeparated.length > 3 || !colonSeparated.length) {
		return null;
	}
	if (colonSeparated.length > 1) {
		const name2 = colonSeparated.pop();
		const prefix = colonSeparated.pop();
		const result = {
			// Allow provider without '@': "provider:prefix:name"
			provider: colonSeparated.length > 0 ? colonSeparated[0] : provider,
			prefix,
			name: name2
		};
		return validate && !validateIconName(result) ? null : result;
	}
	const name = colonSeparated[0];
	const dashSeparated = name.split('-');
	if (dashSeparated.length > 1) {
		const result = {
			provider,
			prefix: dashSeparated.shift(),
			name: dashSeparated.join('-')
		};
		return validate && !validateIconName(result) ? null : result;
	}
	if (allowSimpleName && provider === '') {
		const result = {
			provider,
			prefix: '',
			name
		};
		return validate && !validateIconName(result, allowSimpleName) ? null : result;
	}
	return null;
};
const validateIconName = (icon, allowSimpleName) => {
	if (!icon) {
		return false;
	}
	return !!(
		(icon.provider === '' || icon.provider.match(matchIconName)) &&
		((allowSimpleName && icon.prefix === '') || icon.prefix.match(matchIconName)) &&
		icon.name.match(matchIconName)
	);
};
const defaultIconDimensions = Object.freeze({
	left: 0,
	top: 0,
	width: 16,
	height: 16
});
const defaultIconTransformations = Object.freeze({
	rotate: 0,
	vFlip: false,
	hFlip: false
});
const defaultIconProps = Object.freeze({
	...defaultIconDimensions,
	...defaultIconTransformations
});
const defaultExtendedIconProps = Object.freeze({
	...defaultIconProps,
	body: '',
	hidden: false
});
function mergeIconTransformations(obj1, obj2) {
	const result = {};
	if (!obj1.hFlip !== !obj2.hFlip) {
		result.hFlip = true;
	}
	if (!obj1.vFlip !== !obj2.vFlip) {
		result.vFlip = true;
	}
	const rotate = ((obj1.rotate || 0) + (obj2.rotate || 0)) % 4;
	if (rotate) {
		result.rotate = rotate;
	}
	return result;
}
function mergeIconData(parent, child) {
	const result = mergeIconTransformations(parent, child);
	for (const key in defaultExtendedIconProps) {
		if (key in defaultIconTransformations) {
			if (key in parent && !(key in result)) {
				result[key] = defaultIconTransformations[key];
			}
		} else if (key in child) {
			result[key] = child[key];
		} else if (key in parent) {
			result[key] = parent[key];
		}
	}
	return result;
}
function getIconsTree(data, names) {
	const icons = data.icons;
	const aliases = data.aliases || /* @__PURE__ */ Object.create(null);
	const resolved = /* @__PURE__ */ Object.create(null);
	function resolve(name) {
		if (icons[name]) {
			return (resolved[name] = []);
		}
		if (!(name in resolved)) {
			resolved[name] = null;
			const parent = aliases[name] && aliases[name].parent;
			const value = parent && resolve(parent);
			if (value) {
				resolved[name] = [parent].concat(value);
			}
		}
		return resolved[name];
	}
	(names || Object.keys(icons).concat(Object.keys(aliases))).forEach(resolve);
	return resolved;
}
function internalGetIconData(data, name, tree) {
	const icons = data.icons;
	const aliases = data.aliases || /* @__PURE__ */ Object.create(null);
	let currentProps = {};
	function parse(name2) {
		currentProps = mergeIconData(icons[name2] || aliases[name2], currentProps);
	}
	parse(name);
	tree.forEach(parse);
	return mergeIconData(data, currentProps);
}
function parseIconSet(data, callback) {
	const names = [];
	if (typeof data !== 'object' || typeof data.icons !== 'object') {
		return names;
	}
	if (data.not_found instanceof Array) {
		data.not_found.forEach((name) => {
			callback(name, null);
			names.push(name);
		});
	}
	const tree = getIconsTree(data);
	for (const name in tree) {
		const item = tree[name];
		if (item) {
			callback(name, internalGetIconData(data, name, item));
			names.push(name);
		}
	}
	return names;
}
const optionalPropertyDefaults = {
	provider: '',
	aliases: {},
	not_found: {},
	...defaultIconDimensions
};
function checkOptionalProps(item, defaults) {
	for (const prop in defaults) {
		if (prop in item && typeof item[prop] !== typeof defaults[prop]) {
			return false;
		}
	}
	return true;
}
function quicklyValidateIconSet(obj) {
	if (typeof obj !== 'object' || obj === null) {
		return null;
	}
	const data = obj;
	if (typeof data.prefix !== 'string' || !obj.icons || typeof obj.icons !== 'object') {
		return null;
	}
	if (!checkOptionalProps(obj, optionalPropertyDefaults)) {
		return null;
	}
	const icons = data.icons;
	for (const name in icons) {
		const icon = icons[name];
		if (
			!name.match(matchIconName) ||
			typeof icon.body !== 'string' ||
			!checkOptionalProps(icon, defaultExtendedIconProps)
		) {
			return null;
		}
	}
	const aliases = data.aliases || /* @__PURE__ */ Object.create(null);
	for (const name in aliases) {
		const icon = aliases[name];
		const parent = icon.parent;
		if (
			!name.match(matchIconName) ||
			typeof parent !== 'string' ||
			(!icons[parent] && !aliases[parent]) ||
			!checkOptionalProps(icon, defaultExtendedIconProps)
		) {
			return null;
		}
	}
	return data;
}
const dataStorage = /* @__PURE__ */ Object.create(null);
function newStorage(provider, prefix) {
	return {
		provider,
		prefix,
		icons: /* @__PURE__ */ Object.create(null),
		missing: /* @__PURE__ */ new Set()
	};
}
function getStorage(provider, prefix) {
	const providerStorage =
		dataStorage[provider] || (dataStorage[provider] = /* @__PURE__ */ Object.create(null));
	return providerStorage[prefix] || (providerStorage[prefix] = newStorage(provider, prefix));
}
function addIconSet(storage2, data) {
	if (!quicklyValidateIconSet(data)) {
		return [];
	}
	return parseIconSet(data, (name, icon) => {
		if (icon) {
			storage2.icons[name] = icon;
		} else {
			storage2.missing.add(name);
		}
	});
}
function addIconToStorage(storage2, name, icon) {
	try {
		if (typeof icon.body === 'string') {
			storage2.icons[name] = { ...icon };
			return true;
		}
	} catch (err) {}
	return false;
}
let simpleNames = false;
function allowSimpleNames(allow) {
	if (typeof allow === 'boolean') {
		simpleNames = allow;
	}
	return simpleNames;
}
function getIconData(name) {
	const icon = typeof name === 'string' ? stringToIcon(name, true, simpleNames) : name;
	if (icon) {
		const storage2 = getStorage(icon.provider, icon.prefix);
		const iconName = icon.name;
		return storage2.icons[iconName] || (storage2.missing.has(iconName) ? null : void 0);
	}
}
function addIcon(name, data) {
	const icon = stringToIcon(name, true, simpleNames);
	if (!icon) {
		return false;
	}
	const storage2 = getStorage(icon.provider, icon.prefix);
	return addIconToStorage(storage2, icon.name, data);
}
function addCollection(data, provider) {
	if (typeof data !== 'object') {
		return false;
	}
	if (typeof provider !== 'string') {
		provider = data.provider || '';
	}
	if (simpleNames && !provider && !data.prefix) {
		let added = false;
		if (quicklyValidateIconSet(data)) {
			data.prefix = '';
			parseIconSet(data, (name, icon) => {
				if (icon && addIcon(name, icon)) {
					added = true;
				}
			});
		}
		return added;
	}
	const prefix = data.prefix;
	if (
		!validateIconName({
			provider,
			prefix,
			name: 'a'
		})
	) {
		return false;
	}
	const storage2 = getStorage(provider, prefix);
	return !!addIconSet(storage2, data);
}
const defaultIconSizeCustomisations = Object.freeze({
	width: null,
	height: null
});
const defaultIconCustomisations = Object.freeze({
	// Dimensions
	...defaultIconSizeCustomisations,
	// Transformations
	...defaultIconTransformations
});
const unitsSplit = /(-?[0-9.]*[0-9]+[0-9.]*)/g;
const unitsTest = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function calculateSize(size, ratio, precision) {
	if (ratio === 1) {
		return size;
	}
	precision = precision || 100;
	if (typeof size === 'number') {
		return Math.ceil(size * ratio * precision) / precision;
	}
	if (typeof size !== 'string') {
		return size;
	}
	const oldParts = size.split(unitsSplit);
	if (oldParts === null || !oldParts.length) {
		return size;
	}
	const newParts = [];
	let code = oldParts.shift();
	let isNumber = unitsTest.test(code);
	while (true) {
		if (isNumber) {
			const num = parseFloat(code);
			if (isNaN(num)) {
				newParts.push(code);
			} else {
				newParts.push(Math.ceil(num * ratio * precision) / precision);
			}
		} else {
			newParts.push(code);
		}
		code = oldParts.shift();
		if (code === void 0) {
			return newParts.join('');
		}
		isNumber = !isNumber;
	}
}
function splitSVGDefs(content, tag = 'defs') {
	let defs = '';
	const index = content.indexOf('<' + tag);
	while (index >= 0) {
		const start = content.indexOf('>', index);
		const end = content.indexOf('</' + tag);
		if (start === -1 || end === -1) {
			break;
		}
		const endEnd = content.indexOf('>', end);
		if (endEnd === -1) {
			break;
		}
		defs += content.slice(start + 1, end).trim();
		content = content.slice(0, index).trim() + content.slice(endEnd + 1);
	}
	return {
		defs,
		content
	};
}
function mergeDefsAndContent(defs, content) {
	return defs ? '<defs>' + defs + '</defs>' + content : content;
}
function wrapSVGContent(body, start, end) {
	const split = splitSVGDefs(body);
	return mergeDefsAndContent(split.defs, start + split.content + end);
}
const isUnsetKeyword = (value) => value === 'unset' || value === 'undefined' || value === 'none';
function iconToSVG(icon, customisations) {
	const fullIcon = {
		...defaultIconProps,
		...icon
	};
	const fullCustomisations = {
		...defaultIconCustomisations,
		...customisations
	};
	const box = {
		left: fullIcon.left,
		top: fullIcon.top,
		width: fullIcon.width,
		height: fullIcon.height
	};
	let body = fullIcon.body;
	[fullIcon, fullCustomisations].forEach((props) => {
		const transformations = [];
		const hFlip = props.hFlip;
		const vFlip = props.vFlip;
		let rotation = props.rotate;
		if (hFlip) {
			if (vFlip) {
				rotation += 2;
			} else {
				transformations.push(
					'translate(' + (box.width + box.left).toString() + ' ' + (0 - box.top).toString() + ')'
				);
				transformations.push('scale(-1 1)');
				box.top = box.left = 0;
			}
		} else if (vFlip) {
			transformations.push(
				'translate(' + (0 - box.left).toString() + ' ' + (box.height + box.top).toString() + ')'
			);
			transformations.push('scale(1 -1)');
			box.top = box.left = 0;
		}
		let tempValue;
		if (rotation < 0) {
			rotation -= Math.floor(rotation / 4) * 4;
		}
		rotation = rotation % 4;
		switch (rotation) {
			case 1:
				tempValue = box.height / 2 + box.top;
				transformations.unshift(
					'rotate(90 ' + tempValue.toString() + ' ' + tempValue.toString() + ')'
				);
				break;
			case 2:
				transformations.unshift(
					'rotate(180 ' +
						(box.width / 2 + box.left).toString() +
						' ' +
						(box.height / 2 + box.top).toString() +
						')'
				);
				break;
			case 3:
				tempValue = box.width / 2 + box.left;
				transformations.unshift(
					'rotate(-90 ' + tempValue.toString() + ' ' + tempValue.toString() + ')'
				);
				break;
		}
		if (rotation % 2 === 1) {
			if (box.left !== box.top) {
				tempValue = box.left;
				box.left = box.top;
				box.top = tempValue;
			}
			if (box.width !== box.height) {
				tempValue = box.width;
				box.width = box.height;
				box.height = tempValue;
			}
		}
		if (transformations.length) {
			body = wrapSVGContent(body, '<g transform="' + transformations.join(' ') + '">', '</g>');
		}
	});
	const customisationsWidth = fullCustomisations.width;
	const customisationsHeight = fullCustomisations.height;
	const boxWidth = box.width;
	const boxHeight = box.height;
	let width;
	let height;
	if (customisationsWidth === null) {
		height =
			customisationsHeight === null
				? '1em'
				: customisationsHeight === 'auto'
					? boxHeight
					: customisationsHeight;
		width = calculateSize(height, boxWidth / boxHeight);
	} else {
		width = customisationsWidth === 'auto' ? boxWidth : customisationsWidth;
		height =
			customisationsHeight === null
				? calculateSize(width, boxHeight / boxWidth)
				: customisationsHeight === 'auto'
					? boxHeight
					: customisationsHeight;
	}
	const attributes = {};
	const setAttr = (prop, value) => {
		if (!isUnsetKeyword(value)) {
			attributes[prop] = value.toString();
		}
	};
	setAttr('width', width);
	setAttr('height', height);
	const viewBox = [box.left, box.top, boxWidth, boxHeight];
	attributes.viewBox = viewBox.join(' ');
	return {
		attributes,
		viewBox,
		body
	};
}
const regex = /\sid="(\S+)"/g;
const randomPrefix =
	'IconifyId' + Date.now().toString(16) + ((Math.random() * 16777216) | 0).toString(16);
let counter = 0;
function replaceIDs(body, prefix = randomPrefix) {
	const ids = [];
	let match;
	while ((match = regex.exec(body))) {
		ids.push(match[1]);
	}
	if (!ids.length) {
		return body;
	}
	const suffix = 'suffix' + ((Math.random() * 16777216) | Date.now()).toString(16);
	ids.forEach((id) => {
		const newID = typeof prefix === 'function' ? prefix(id) : prefix + (counter++).toString();
		const escapedID = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
		body = body.replace(
			// Allowed characters before id: [#;"]
			// Allowed characters after id: [)"], .[a-z]
			new RegExp('([#;"])(' + escapedID + ')([")]|\\.[a-z])', 'g'),
			'$1' + newID + suffix + '$3'
		);
	});
	body = body.replace(new RegExp(suffix, 'g'), '');
	return body;
}
const storage = /* @__PURE__ */ Object.create(null);
function setAPIModule(provider, item) {
	storage[provider] = item;
}
function getAPIModule(provider) {
	return storage[provider] || storage[''];
}
function createAPIConfig(source) {
	let resources;
	if (typeof source.resources === 'string') {
		resources = [source.resources];
	} else {
		resources = source.resources;
		if (!(resources instanceof Array) || !resources.length) {
			return null;
		}
	}
	const result = {
		// API hosts
		resources,
		// Root path
		path: source.path || '/',
		// URL length limit
		maxURL: source.maxURL || 500,
		// Timeout before next host is used.
		rotate: source.rotate || 750,
		// Timeout before failing query.
		timeout: source.timeout || 5e3,
		// Randomise default API end point.
		random: source.random === true,
		// Start index
		index: source.index || 0,
		// Receive data after time out (used if time out kicks in first, then API module sends data anyway).
		dataAfterTimeout: source.dataAfterTimeout !== false
	};
	return result;
}
const configStorage = /* @__PURE__ */ Object.create(null);
const fallBackAPISources = ['https://api.simplesvg.com', 'https://api.unisvg.com'];
const fallBackAPI = [];
while (fallBackAPISources.length > 0) {
	if (fallBackAPISources.length === 1) {
		fallBackAPI.push(fallBackAPISources.shift());
	} else {
		if (Math.random() > 0.5) {
			fallBackAPI.push(fallBackAPISources.shift());
		} else {
			fallBackAPI.push(fallBackAPISources.pop());
		}
	}
}
configStorage[''] = createAPIConfig({
	resources: ['https://api.iconify.design'].concat(fallBackAPI)
});
function addAPIProvider(provider, customConfig) {
	const config = createAPIConfig(customConfig);
	if (config === null) {
		return false;
	}
	configStorage[provider] = config;
	return true;
}
function getAPIConfig(provider) {
	return configStorage[provider];
}
const detectFetch = () => {
	let callback;
	try {
		callback = fetch;
		if (typeof callback === 'function') {
			return callback;
		}
	} catch (err) {}
};
let fetchModule = detectFetch();
function calculateMaxLength(provider, prefix) {
	const config = getAPIConfig(provider);
	if (!config) {
		return 0;
	}
	let result;
	if (!config.maxURL) {
		result = 0;
	} else {
		let maxHostLength = 0;
		config.resources.forEach((item) => {
			const host = item;
			maxHostLength = Math.max(maxHostLength, host.length);
		});
		const url = prefix + '.json?icons=';
		result = config.maxURL - maxHostLength - config.path.length - url.length;
	}
	return result;
}
function shouldAbort(status) {
	return status === 404;
}
const prepare = (provider, prefix, icons) => {
	const results = [];
	const maxLength = calculateMaxLength(provider, prefix);
	const type = 'icons';
	let item = {
		type,
		provider,
		prefix,
		icons: []
	};
	let length = 0;
	icons.forEach((name, index) => {
		length += name.length + 1;
		if (length >= maxLength && index > 0) {
			results.push(item);
			item = {
				type,
				provider,
				prefix,
				icons: []
			};
			length = name.length;
		}
		item.icons.push(name);
	});
	results.push(item);
	return results;
};
function getPath(provider) {
	if (typeof provider === 'string') {
		const config = getAPIConfig(provider);
		if (config) {
			return config.path;
		}
	}
	return '/';
}
const send = (host, params, callback) => {
	if (!fetchModule) {
		callback('abort', 424);
		return;
	}
	let path = getPath(params.provider);
	switch (params.type) {
		case 'icons': {
			const prefix = params.prefix;
			const icons = params.icons;
			const iconsList = icons.join(',');
			const urlParams = new URLSearchParams({
				icons: iconsList
			});
			path += prefix + '.json?' + urlParams.toString();
			break;
		}
		case 'custom': {
			const uri = params.uri;
			path += uri.slice(0, 1) === '/' ? uri.slice(1) : uri;
			break;
		}
		default:
			callback('abort', 400);
			return;
	}
	let defaultError = 503;
	fetchModule(host + path)
		.then((response) => {
			const status = response.status;
			if (status !== 200) {
				setTimeout(() => {
					callback(shouldAbort(status) ? 'abort' : 'next', status);
				});
				return;
			}
			defaultError = 501;
			return response.json();
		})
		.then((data) => {
			if (typeof data !== 'object' || data === null) {
				setTimeout(() => {
					if (data === 404) {
						callback('abort', data);
					} else {
						callback('next', defaultError);
					}
				});
				return;
			}
			setTimeout(() => {
				callback('success', data);
			});
		})
		.catch(() => {
			callback('next', defaultError);
		});
};
const fetchAPIModule = {
	prepare,
	send
};
function sortIcons(icons) {
	const result = {
		loaded: [],
		missing: [],
		pending: []
	};
	const storage2 = /* @__PURE__ */ Object.create(null);
	icons.sort((a, b) => {
		if (a.provider !== b.provider) {
			return a.provider.localeCompare(b.provider);
		}
		if (a.prefix !== b.prefix) {
			return a.prefix.localeCompare(b.prefix);
		}
		return a.name.localeCompare(b.name);
	});
	let lastIcon = {
		provider: '',
		prefix: '',
		name: ''
	};
	icons.forEach((icon) => {
		if (
			lastIcon.name === icon.name &&
			lastIcon.prefix === icon.prefix &&
			lastIcon.provider === icon.provider
		) {
			return;
		}
		lastIcon = icon;
		const provider = icon.provider;
		const prefix = icon.prefix;
		const name = icon.name;
		const providerStorage =
			storage2[provider] || (storage2[provider] = /* @__PURE__ */ Object.create(null));
		const localStorage =
			providerStorage[prefix] || (providerStorage[prefix] = getStorage(provider, prefix));
		let list;
		if (name in localStorage.icons) {
			list = result.loaded;
		} else if (prefix === '' || localStorage.missing.has(name)) {
			list = result.missing;
		} else {
			list = result.pending;
		}
		const item = {
			provider,
			prefix,
			name
		};
		list.push(item);
	});
	return result;
}
function removeCallback(storages, id) {
	storages.forEach((storage2) => {
		const items = storage2.loaderCallbacks;
		if (items) {
			storage2.loaderCallbacks = items.filter((row) => row.id !== id);
		}
	});
}
function updateCallbacks(storage2) {
	if (!storage2.pendingCallbacksFlag) {
		storage2.pendingCallbacksFlag = true;
		setTimeout(() => {
			storage2.pendingCallbacksFlag = false;
			const items = storage2.loaderCallbacks ? storage2.loaderCallbacks.slice(0) : [];
			if (!items.length) {
				return;
			}
			let hasPending = false;
			const provider = storage2.provider;
			const prefix = storage2.prefix;
			items.forEach((item) => {
				const icons = item.icons;
				const oldLength = icons.pending.length;
				icons.pending = icons.pending.filter((icon) => {
					if (icon.prefix !== prefix) {
						return true;
					}
					const name = icon.name;
					if (storage2.icons[name]) {
						icons.loaded.push({
							provider,
							prefix,
							name
						});
					} else if (storage2.missing.has(name)) {
						icons.missing.push({
							provider,
							prefix,
							name
						});
					} else {
						hasPending = true;
						return true;
					}
					return false;
				});
				if (icons.pending.length !== oldLength) {
					if (!hasPending) {
						removeCallback([storage2], item.id);
					}
					item.callback(
						icons.loaded.slice(0),
						icons.missing.slice(0),
						icons.pending.slice(0),
						item.abort
					);
				}
			});
		});
	}
}
let idCounter = 0;
function storeCallback(callback, icons, pendingSources) {
	const id = idCounter++;
	const abort = removeCallback.bind(null, pendingSources, id);
	if (!icons.pending.length) {
		return abort;
	}
	const item = {
		id,
		icons,
		callback,
		abort
	};
	pendingSources.forEach((storage2) => {
		(storage2.loaderCallbacks || (storage2.loaderCallbacks = [])).push(item);
	});
	return abort;
}
function listToIcons(list, validate = true, simpleNames2 = false) {
	const result = [];
	list.forEach((item) => {
		const icon = typeof item === 'string' ? stringToIcon(item, validate, simpleNames2) : item;
		if (icon) {
			result.push(icon);
		}
	});
	return result;
}
var defaultConfig = {
	resources: [],
	index: 0,
	timeout: 2e3,
	rotate: 750,
	random: false,
	dataAfterTimeout: false
};
function sendQuery(config, payload, query, done) {
	const resourcesCount = config.resources.length;
	const startIndex = config.random ? Math.floor(Math.random() * resourcesCount) : config.index;
	let resources;
	if (config.random) {
		let list = config.resources.slice(0);
		resources = [];
		while (list.length > 1) {
			const nextIndex = Math.floor(Math.random() * list.length);
			resources.push(list[nextIndex]);
			list = list.slice(0, nextIndex).concat(list.slice(nextIndex + 1));
		}
		resources = resources.concat(list);
	} else {
		resources = config.resources.slice(startIndex).concat(config.resources.slice(0, startIndex));
	}
	const startTime = Date.now();
	let status = 'pending';
	let queriesSent = 0;
	let lastError;
	let timer = null;
	let queue = [];
	let doneCallbacks = [];
	if (typeof done === 'function') {
		doneCallbacks.push(done);
	}
	function resetTimer() {
		if (timer) {
			clearTimeout(timer);
			timer = null;
		}
	}
	function abort() {
		if (status === 'pending') {
			status = 'aborted';
		}
		resetTimer();
		queue.forEach((item) => {
			if (item.status === 'pending') {
				item.status = 'aborted';
			}
		});
		queue = [];
	}
	function subscribe(callback, overwrite) {
		if (overwrite) {
			doneCallbacks = [];
		}
		if (typeof callback === 'function') {
			doneCallbacks.push(callback);
		}
	}
	function getQueryStatus() {
		return {
			startTime,
			payload,
			status,
			queriesSent,
			queriesPending: queue.length,
			subscribe,
			abort
		};
	}
	function failQuery() {
		status = 'failed';
		doneCallbacks.forEach((callback) => {
			callback(void 0, lastError);
		});
	}
	function clearQueue() {
		queue.forEach((item) => {
			if (item.status === 'pending') {
				item.status = 'aborted';
			}
		});
		queue = [];
	}
	function moduleResponse(item, response, data) {
		const isError = response !== 'success';
		queue = queue.filter((queued) => queued !== item);
		switch (status) {
			case 'pending':
				break;
			case 'failed':
				if (isError || !config.dataAfterTimeout) {
					return;
				}
				break;
			default:
				return;
		}
		if (response === 'abort') {
			lastError = data;
			failQuery();
			return;
		}
		if (isError) {
			lastError = data;
			if (!queue.length) {
				if (!resources.length) {
					failQuery();
				} else {
					execNext();
				}
			}
			return;
		}
		resetTimer();
		clearQueue();
		if (!config.random) {
			const index = config.resources.indexOf(item.resource);
			if (index !== -1 && index !== config.index) {
				config.index = index;
			}
		}
		status = 'completed';
		doneCallbacks.forEach((callback) => {
			callback(data);
		});
	}
	function execNext() {
		if (status !== 'pending') {
			return;
		}
		resetTimer();
		const resource = resources.shift();
		if (resource === void 0) {
			if (queue.length) {
				timer = setTimeout(() => {
					resetTimer();
					if (status === 'pending') {
						clearQueue();
						failQuery();
					}
				}, config.timeout);
				return;
			}
			failQuery();
			return;
		}
		const item = {
			status: 'pending',
			resource,
			callback: (status2, data) => {
				moduleResponse(item, status2, data);
			}
		};
		queue.push(item);
		queriesSent++;
		timer = setTimeout(execNext, config.rotate);
		query(resource, payload, item.callback);
	}
	setTimeout(execNext);
	return getQueryStatus;
}
function initRedundancy(cfg) {
	const config = {
		...defaultConfig,
		...cfg
	};
	let queries = [];
	function cleanup() {
		queries = queries.filter((item) => item().status === 'pending');
	}
	function query(payload, queryCallback, doneCallback) {
		const query2 = sendQuery(config, payload, queryCallback, (data, error) => {
			cleanup();
			if (doneCallback) {
				doneCallback(data, error);
			}
		});
		queries.push(query2);
		return query2;
	}
	function find(callback) {
		return (
			queries.find((value) => {
				return callback(value);
			}) || null
		);
	}
	const instance = {
		query,
		find,
		setIndex: (index) => {
			config.index = index;
		},
		getIndex: () => config.index,
		cleanup
	};
	return instance;
}
function emptyCallback$1() {}
const redundancyCache = /* @__PURE__ */ Object.create(null);
function getRedundancyCache(provider) {
	if (!redundancyCache[provider]) {
		const config = getAPIConfig(provider);
		if (!config) {
			return;
		}
		const redundancy = initRedundancy(config);
		const cachedReundancy = {
			config,
			redundancy
		};
		redundancyCache[provider] = cachedReundancy;
	}
	return redundancyCache[provider];
}
function sendAPIQuery(target, query, callback) {
	let redundancy;
	let send2;
	if (typeof target === 'string') {
		const api = getAPIModule(target);
		if (!api) {
			callback(void 0, 424);
			return emptyCallback$1;
		}
		send2 = api.send;
		const cached = getRedundancyCache(target);
		if (cached) {
			redundancy = cached.redundancy;
		}
	} else {
		const config = createAPIConfig(target);
		if (config) {
			redundancy = initRedundancy(config);
			const moduleKey = target.resources ? target.resources[0] : '';
			const api = getAPIModule(moduleKey);
			if (api) {
				send2 = api.send;
			}
		}
	}
	if (!redundancy || !send2) {
		callback(void 0, 424);
		return emptyCallback$1;
	}
	return redundancy.query(query, send2, callback)().abort;
}
const browserCacheVersion = 'iconify2';
const browserCachePrefix = 'iconify';
const browserCacheCountKey = browserCachePrefix + '-count';
const browserCacheVersionKey = browserCachePrefix + '-version';
const browserStorageHour = 36e5;
const browserStorageCacheExpiration = 168;
const browserStorageLimit = 50;
function getStoredItem(func, key) {
	try {
		return func.getItem(key);
	} catch (err) {}
}
function setStoredItem(func, key, value) {
	try {
		func.setItem(key, value);
		return true;
	} catch (err) {}
}
function removeStoredItem(func, key) {
	try {
		func.removeItem(key);
	} catch (err) {}
}
function setBrowserStorageItemsCount(storage2, value) {
	return setStoredItem(storage2, browserCacheCountKey, value.toString());
}
function getBrowserStorageItemsCount(storage2) {
	return parseInt(getStoredItem(storage2, browserCacheCountKey)) || 0;
}
const browserStorageConfig = {
	local: true,
	session: true
};
const browserStorageEmptyItems = {
	local: /* @__PURE__ */ new Set(),
	session: /* @__PURE__ */ new Set()
};
let browserStorageStatus = false;
function setBrowserStorageStatus(status) {
	browserStorageStatus = status;
}
let _window = typeof window === 'undefined' ? {} : window;
function getBrowserStorage(key) {
	const attr2 = key + 'Storage';
	try {
		if (_window && _window[attr2] && typeof _window[attr2].length === 'number') {
			return _window[attr2];
		}
	} catch (err) {}
	browserStorageConfig[key] = false;
}
function iterateBrowserStorage(key, callback) {
	const func = getBrowserStorage(key);
	if (!func) {
		return;
	}
	const version = getStoredItem(func, browserCacheVersionKey);
	if (version !== browserCacheVersion) {
		if (version) {
			const total2 = getBrowserStorageItemsCount(func);
			for (let i = 0; i < total2; i++) {
				removeStoredItem(func, browserCachePrefix + i.toString());
			}
		}
		setStoredItem(func, browserCacheVersionKey, browserCacheVersion);
		setBrowserStorageItemsCount(func, 0);
		return;
	}
	const minTime = Math.floor(Date.now() / browserStorageHour) - browserStorageCacheExpiration;
	const parseItem = (index) => {
		const name = browserCachePrefix + index.toString();
		const item = getStoredItem(func, name);
		if (typeof item !== 'string') {
			return;
		}
		try {
			const data = JSON.parse(item);
			if (
				typeof data === 'object' &&
				typeof data.cached === 'number' &&
				data.cached > minTime &&
				typeof data.provider === 'string' &&
				typeof data.data === 'object' &&
				typeof data.data.prefix === 'string' && // Valid item: run callback
				callback(data, index)
			) {
				return true;
			}
		} catch (err) {}
		removeStoredItem(func, name);
	};
	let total = getBrowserStorageItemsCount(func);
	for (let i = total - 1; i >= 0; i--) {
		if (!parseItem(i)) {
			if (i === total - 1) {
				total--;
				setBrowserStorageItemsCount(func, total);
			} else {
				browserStorageEmptyItems[key].add(i);
			}
		}
	}
}
function initBrowserStorage() {
	if (browserStorageStatus) {
		return;
	}
	setBrowserStorageStatus(true);
	for (const key in browserStorageConfig) {
		iterateBrowserStorage(key, (item) => {
			const iconSet = item.data;
			const provider = item.provider;
			const prefix = iconSet.prefix;
			const storage2 = getStorage(provider, prefix);
			if (!addIconSet(storage2, iconSet).length) {
				return false;
			}
			const lastModified = iconSet.lastModified || -1;
			storage2.lastModifiedCached = storage2.lastModifiedCached
				? Math.min(storage2.lastModifiedCached, lastModified)
				: lastModified;
			return true;
		});
	}
}
function updateLastModified(storage2, lastModified) {
	const lastValue = storage2.lastModifiedCached;
	if (
		// Matches or newer
		lastValue &&
		lastValue >= lastModified
	) {
		return lastValue === lastModified;
	}
	storage2.lastModifiedCached = lastModified;
	if (lastValue) {
		for (const key in browserStorageConfig) {
			iterateBrowserStorage(key, (item) => {
				const iconSet = item.data;
				return (
					item.provider !== storage2.provider ||
					iconSet.prefix !== storage2.prefix ||
					iconSet.lastModified === lastModified
				);
			});
		}
	}
	return true;
}
function storeInBrowserStorage(storage2, data) {
	if (!browserStorageStatus) {
		initBrowserStorage();
	}
	function store(key) {
		let func;
		if (!browserStorageConfig[key] || !(func = getBrowserStorage(key))) {
			return;
		}
		const set = browserStorageEmptyItems[key];
		let index;
		if (set.size) {
			set.delete((index = Array.from(set).shift()));
		} else {
			index = getBrowserStorageItemsCount(func);
			if (index >= browserStorageLimit || !setBrowserStorageItemsCount(func, index + 1)) {
				return;
			}
		}
		const item = {
			cached: Math.floor(Date.now() / browserStorageHour),
			provider: storage2.provider,
			data
		};
		return setStoredItem(func, browserCachePrefix + index.toString(), JSON.stringify(item));
	}
	if (data.lastModified && !updateLastModified(storage2, data.lastModified)) {
		return;
	}
	if (!Object.keys(data.icons).length) {
		return;
	}
	if (data.not_found) {
		data = Object.assign({}, data);
		delete data.not_found;
	}
	if (!store('local')) {
		store('session');
	}
}
function emptyCallback() {}
function loadedNewIcons(storage2) {
	if (!storage2.iconsLoaderFlag) {
		storage2.iconsLoaderFlag = true;
		setTimeout(() => {
			storage2.iconsLoaderFlag = false;
			updateCallbacks(storage2);
		});
	}
}
function loadNewIcons(storage2, icons) {
	if (!storage2.iconsToLoad) {
		storage2.iconsToLoad = icons;
	} else {
		storage2.iconsToLoad = storage2.iconsToLoad.concat(icons).sort();
	}
	if (!storage2.iconsQueueFlag) {
		storage2.iconsQueueFlag = true;
		setTimeout(() => {
			storage2.iconsQueueFlag = false;
			const { provider, prefix } = storage2;
			const icons2 = storage2.iconsToLoad;
			delete storage2.iconsToLoad;
			let api;
			if (!icons2 || !(api = getAPIModule(provider))) {
				return;
			}
			const params = api.prepare(provider, prefix, icons2);
			params.forEach((item) => {
				sendAPIQuery(provider, item, (data) => {
					if (typeof data !== 'object') {
						item.icons.forEach((name) => {
							storage2.missing.add(name);
						});
					} else {
						try {
							const parsed = addIconSet(storage2, data);
							if (!parsed.length) {
								return;
							}
							const pending = storage2.pendingIcons;
							if (pending) {
								parsed.forEach((name) => {
									pending.delete(name);
								});
							}
							storeInBrowserStorage(storage2, data);
						} catch (err) {
							console.error(err);
						}
					}
					loadedNewIcons(storage2);
				});
			});
		});
	}
}
const loadIcons = (icons, callback) => {
	const cleanedIcons = listToIcons(icons, true, allowSimpleNames());
	const sortedIcons = sortIcons(cleanedIcons);
	if (!sortedIcons.pending.length) {
		let callCallback = true;
		if (callback) {
			setTimeout(() => {
				if (callCallback) {
					callback(sortedIcons.loaded, sortedIcons.missing, sortedIcons.pending, emptyCallback);
				}
			});
		}
		return () => {
			callCallback = false;
		};
	}
	const newIcons = /* @__PURE__ */ Object.create(null);
	const sources = [];
	let lastProvider, lastPrefix;
	sortedIcons.pending.forEach((icon) => {
		const { provider, prefix } = icon;
		if (prefix === lastPrefix && provider === lastProvider) {
			return;
		}
		lastProvider = provider;
		lastPrefix = prefix;
		sources.push(getStorage(provider, prefix));
		const providerNewIcons =
			newIcons[provider] || (newIcons[provider] = /* @__PURE__ */ Object.create(null));
		if (!providerNewIcons[prefix]) {
			providerNewIcons[prefix] = [];
		}
	});
	sortedIcons.pending.forEach((icon) => {
		const { provider, prefix, name } = icon;
		const storage2 = getStorage(provider, prefix);
		const pendingQueue =
			storage2.pendingIcons || (storage2.pendingIcons = /* @__PURE__ */ new Set());
		if (!pendingQueue.has(name)) {
			pendingQueue.add(name);
			newIcons[provider][prefix].push(name);
		}
	});
	sources.forEach((storage2) => {
		const { provider, prefix } = storage2;
		if (newIcons[provider][prefix].length) {
			loadNewIcons(storage2, newIcons[provider][prefix]);
		}
	});
	return callback ? storeCallback(callback, sortedIcons, sources) : emptyCallback;
};
function mergeCustomisations(defaults, item) {
	const result = {
		...defaults
	};
	for (const key in item) {
		const value = item[key];
		const valueType = typeof value;
		if (key in defaultIconSizeCustomisations) {
			if (value === null || (value && (valueType === 'string' || valueType === 'number'))) {
				result[key] = value;
			}
		} else if (valueType === typeof result[key]) {
			result[key] = key === 'rotate' ? value % 4 : value;
		}
	}
	return result;
}
const separator = /[\s,]+/;
function flipFromString(custom, flip) {
	flip.split(separator).forEach((str) => {
		const value = str.trim();
		switch (value) {
			case 'horizontal':
				custom.hFlip = true;
				break;
			case 'vertical':
				custom.vFlip = true;
				break;
		}
	});
}
function rotateFromString(value, defaultValue = 0) {
	const units = value.replace(/^-?[0-9.]*/, '');
	function cleanup(value2) {
		while (value2 < 0) {
			value2 += 4;
		}
		return value2 % 4;
	}
	if (units === '') {
		const num = parseInt(value);
		return isNaN(num) ? 0 : cleanup(num);
	} else if (units !== value) {
		let split = 0;
		switch (units) {
			case '%':
				split = 25;
				break;
			case 'deg':
				split = 90;
		}
		if (split) {
			let num = parseFloat(value.slice(0, value.length - units.length));
			if (isNaN(num)) {
				return 0;
			}
			num = num / split;
			return num % 1 === 0 ? cleanup(num) : 0;
		}
	}
	return defaultValue;
}
function iconToHTML(body, attributes) {
	let renderAttribsHTML =
		body.indexOf('xlink:') === -1 ? '' : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
	for (const attr2 in attributes) {
		renderAttribsHTML += ' ' + attr2 + '="' + attributes[attr2] + '"';
	}
	return '<svg xmlns="http://www.w3.org/2000/svg"' + renderAttribsHTML + '>' + body + '</svg>';
}
function encodeSVGforURL(svg) {
	return svg
		.replace(/"/g, "'")
		.replace(/%/g, '%25')
		.replace(/#/g, '%23')
		.replace(/</g, '%3C')
		.replace(/>/g, '%3E')
		.replace(/\s+/g, ' ');
}
function svgToData(svg) {
	return 'data:image/svg+xml,' + encodeSVGforURL(svg);
}
function svgToURL(svg) {
	return 'url("' + svgToData(svg) + '")';
}
const defaultExtendedIconCustomisations = {
	...defaultIconCustomisations,
	inline: false
};
const svgDefaults = {
	xmlns: 'http://www.w3.org/2000/svg',
	'xmlns:xlink': 'http://www.w3.org/1999/xlink',
	'aria-hidden': true,
	role: 'img'
};
const commonProps = {
	display: 'inline-block'
};
const monotoneProps = {
	'background-color': 'currentColor'
};
const coloredProps = {
	'background-color': 'transparent'
};
const propsToAdd = {
	image: 'var(--svg)',
	repeat: 'no-repeat',
	size: '100% 100%'
};
const propsToAddTo = {
	'-webkit-mask': monotoneProps,
	mask: monotoneProps,
	background: coloredProps
};
for (const prefix in propsToAddTo) {
	const list = propsToAddTo[prefix];
	for (const prop in propsToAdd) {
		list[prefix + '-' + prop] = propsToAdd[prop];
	}
}
function fixSize(value) {
	return value + (value.match(/^[-0-9.]+$/) ? 'px' : '');
}
function render(icon, props) {
	const customisations = mergeCustomisations(defaultExtendedIconCustomisations, props);
	const mode = props.mode || 'svg';
	const componentProps = mode === 'svg' ? { ...svgDefaults } : {};
	if (icon.body.indexOf('xlink:') === -1) {
		delete componentProps['xmlns:xlink'];
	}
	let style = typeof props.style === 'string' ? props.style : '';
	for (let key in props) {
		const value = props[key];
		if (value === void 0) {
			continue;
		}
		switch (key) {
			case 'icon':
			case 'style':
			case 'onLoad':
			case 'mode':
				break;
			case 'inline':
			case 'hFlip':
			case 'vFlip':
				customisations[key] = value === true || value === 'true' || value === 1;
				break;
			case 'flip':
				if (typeof value === 'string') {
					flipFromString(customisations, value);
				}
				break;
			case 'color':
				style =
					style +
					(style.length > 0 && style.trim().slice(-1) !== ';' ? ';' : '') +
					'color: ' +
					value +
					'; ';
				break;
			case 'rotate':
				if (typeof value === 'string') {
					customisations[key] = rotateFromString(value);
				} else if (typeof value === 'number') {
					customisations[key] = value;
				}
				break;
			case 'ariaHidden':
			case 'aria-hidden':
				if (value !== true && value !== 'true') {
					delete componentProps['aria-hidden'];
				}
				break;
			default:
				if (key.slice(0, 3) === 'on:') {
					break;
				}
				if (defaultExtendedIconCustomisations[key] === void 0) {
					componentProps[key] = value;
				}
		}
	}
	const item = iconToSVG(icon, customisations);
	const renderAttribs = item.attributes;
	if (customisations.inline) {
		style = 'vertical-align: -0.125em; ' + style;
	}
	if (mode === 'svg') {
		Object.assign(componentProps, renderAttribs);
		if (style !== '') {
			componentProps.style = style;
		}
		let localCounter = 0;
		let id = props.id;
		if (typeof id === 'string') {
			id = id.replace(/-/g, '_');
		}
		return {
			svg: true,
			attributes: componentProps,
			body: replaceIDs(item.body, id ? () => id + 'ID' + localCounter++ : 'iconifySvelte')
		};
	}
	const { body, width, height } = icon;
	const useMask = mode === 'mask' || (mode === 'bg' ? false : body.indexOf('currentColor') !== -1);
	const html = iconToHTML(body, {
		...renderAttribs,
		width: width + '',
		height: height + ''
	});
	const url = svgToURL(html);
	const styles = {
		'--svg': url
	};
	const size = (prop) => {
		const value = renderAttribs[prop];
		if (value) {
			styles[prop] = fixSize(value);
		}
	};
	size('width');
	size('height');
	Object.assign(styles, commonProps, useMask ? monotoneProps : coloredProps);
	let customStyle = '';
	for (const key in styles) {
		customStyle += key + ': ' + styles[key] + ';';
	}
	componentProps.style = customStyle + style;
	return {
		svg: false,
		attributes: componentProps
	};
}
allowSimpleNames(true);
setAPIModule('', fetchAPIModule);
if (typeof document !== 'undefined' && typeof window !== 'undefined') {
	initBrowserStorage();
	const _window2 = window;
	if (_window2.IconifyPreload !== void 0) {
		const preload = _window2.IconifyPreload;
		const err = 'Invalid IconifyPreload syntax.';
		if (typeof preload === 'object' && preload !== null) {
			(preload instanceof Array ? preload : [preload]).forEach((item) => {
				try {
					if (
						// Check if item is an object and not null/array
						typeof item !== 'object' ||
						item === null ||
						item instanceof Array || // Check for 'icons' and 'prefix'
						typeof item.icons !== 'object' ||
						typeof item.prefix !== 'string' || // Add icon set
						!addCollection(item)
					) {
						console.error(err);
					}
				} catch (e) {
					console.error(err);
				}
			});
		}
	}
	if (_window2.IconifyProviders !== void 0) {
		const providers = _window2.IconifyProviders;
		if (typeof providers === 'object' && providers !== null) {
			for (let key in providers) {
				const err = 'IconifyProviders[' + key + '] is invalid.';
				try {
					const value = providers[key];
					if (typeof value !== 'object' || !value || value.resources === void 0) {
						continue;
					}
					if (!addAPIProvider(key, value)) {
						console.error(err);
					}
				} catch (e) {
					console.error(err);
				}
			}
		}
	}
}
function checkIconState(icon, state, mounted, callback, onload) {
	function abortLoading() {
		if (state.loading) {
			state.loading.abort();
			state.loading = null;
		}
	}
	if (typeof icon === 'object' && icon !== null && typeof icon.body === 'string') {
		state.name = '';
		abortLoading();
		return { data: { ...defaultIconProps, ...icon } };
	}
	let iconName;
	if (typeof icon !== 'string' || (iconName = stringToIcon(icon, false, true)) === null) {
		abortLoading();
		return null;
	}
	const data = getIconData(iconName);
	if (!data) {
		if (mounted && (!state.loading || state.loading.name !== icon)) {
			abortLoading();
			state.name = '';
			state.loading = {
				name: icon,
				abort: loadIcons([iconName], callback)
			};
		}
		return null;
	}
	abortLoading();
	if (state.name !== icon) {
		state.name = icon;
		if (onload && !state.destroyed) {
			onload(icon);
		}
	}
	const classes = ['iconify'];
	if (iconName.prefix !== '') {
		classes.push('iconify--' + iconName.prefix);
	}
	if (iconName.provider !== '') {
		classes.push('iconify--' + iconName.provider);
	}
	return { data, classes };
}
function generateIcon(icon, props) {
	return icon
		? render(
				{
					...defaultIconProps,
					...icon
				},
				props
			)
		: null;
}
function Icon($$payload, $$props) {
	const $$sanitized_props = sanitize_props($$props);
	push(false);
	const state = {
		// Last icon name
		name: '',
		// Loading status
		loading: null,
		// Destroyed status
		destroyed: false
	};
	let mounted = false;
	let data;
	const onLoad = (icon) => {
		if (typeof $$sanitized_props.onLoad === 'function') {
			$$sanitized_props.onLoad(icon);
		}
		const dispatch = createEventDispatcher();
		dispatch('load', { icon });
	};
	function loaded() {}
	onDestroy(() => {
		state.destroyed = true;
		if (state.loading) {
			state.loading.abort();
			state.loading = null;
		}
	});
	{
		const iconData = checkIconState($$sanitized_props.icon, state, mounted, loaded, onLoad);
		data = iconData ? generateIcon(iconData.data, $$sanitized_props) : null;
		if (data && iconData.classes) {
			data.attributes['class'] =
				(typeof $$sanitized_props['class'] === 'string' ? $$sanitized_props['class'] + ' ' : '') +
				iconData.classes.join(' ');
		}
	}
	const anchor = create_anchor($$payload);
	$$payload.out += `${anchor}`;
	if (data) {
		$$payload.out += '<!--ssr:if:true-->';
		const anchor_1 = create_anchor($$payload);
		$$payload.out += `${anchor_1}`;
		if (data.svg) {
			$$payload.out += '<!--ssr:if:true-->';
			const anchor_2 = create_anchor($$payload);
			$$payload.out += `<svg${spread_attributes([data.attributes], false, true, '')}>${anchor_2}${data.body}${anchor_2}</svg>`;
		} else {
			$$payload.out += '<!--ssr:if:false-->';
			$$payload.out += `<span${spread_attributes([data.attributes], true, false, '')}></span>`;
		}
		$$payload.out += `${anchor_1}`;
	} else {
		$$payload.out += '<!--ssr:if:false-->';
	}
	$$payload.out += `${anchor}`;
	pop();
}
function Header($$payload, $$props) {
	push(false);
	let user = getUserContext();
	const anchor = create_anchor($$payload);
	const anchor_1 = create_anchor($$payload);
	const anchor_4 = create_anchor($$payload);
	const anchor_6 = create_anchor($$payload);
	const anchor_9 = create_anchor($$payload);
	$$payload.out += `${anchor}`;
	{
		$$payload.out += '<!--ssr:if:false-->';
	}
	$$payload.out += `${anchor} <div class="p-4 sticky z-40 top-0"><header class="flex flex-col max-w-4xl w-full mx-auto border-2 border-black rounded-[36px] px-8 py-2 bg-white"><div class="flex items-center justify-between"><a href="/"><h1 class="text-3xl font-black py-2 hover:underline">Timeplan</h1></a> <nav class="hidden md:block ml-5"><ul class="flex gap-2">${anchor_1}`;
	if (user) {
		$$payload.out += '<!--ssr:if:true-->';
		const anchor_2 = create_anchor($$payload);
		const anchor_3 = create_anchor($$payload);
		$$payload.out += `${anchor_2}`;
		HeaderItem($$payload, {
			href: '/profile',
			children: ($$payload2, $$slotProps) => {
				$$payload2.out += `Min profil`;
			}
		});
		$$payload.out += `${anchor_2} <li>${anchor_3}`;
		HeaderItem($$payload, {
			href: '/api/auth/logout',
			children: ($$payload2, $$slotProps) => {
				$$payload2.out += `Logg ut`;
			}
		});
		$$payload.out += `${anchor_3}</li>`;
	} else {
		$$payload.out += '<!--ssr:if:false-->';
	}
	$$payload.out += `${anchor_1} ${anchor_4}`;
	if (!user) {
		$$payload.out += '<!--ssr:if:true-->';
		const anchor_5 = create_anchor($$payload);
		$$payload.out += `${anchor_5}`;
		HeaderItem($$payload, {
			href: '/logg-inn',
			children: ($$payload2, $$slotProps) => {
				$$payload2.out += `Logg inn`;
			}
		});
		$$payload.out += `${anchor_5}`;
	} else {
		$$payload.out += '<!--ssr:if:false-->';
	}
	$$payload.out += `${anchor_4}</ul></nav> <button class="block md:hidden border-2 border-black rounded-full p-1">${anchor_6}`;
	{
		$$payload.out += '<!--ssr:if:false-->';
		const anchor_8 = create_anchor($$payload);
		$$payload.out += `${anchor_8}`;
		Icon($$payload, { icon: 'mdi:menu', class: 'w-6 h-6 font-bold' });
		$$payload.out += `${anchor_8}`;
	}
	$$payload.out += `${anchor_6}</button></div> ${anchor_9}`;
	{
		$$payload.out += '<!--ssr:if:false-->';
	}
	$$payload.out += `${anchor_9}</header></div>`;
	pop();
}
function writableDerived(origins, derive, reflect, initial) {
	var childDerivedSetter,
		originValues,
		blockNextDerive = false;
	var reflectOldValues = reflect.length >= 2;
	var wrappedDerive = (got, set, update3) => {
		childDerivedSetter = set;
		if (reflectOldValues) {
			originValues = got;
		}
		if (!blockNextDerive) {
			let returned = derive(got, set, update3);
			if (derive.length < 2) {
				set(returned);
			} else {
				return returned;
			}
		}
		blockNextDerive = false;
	};
	var childDerived = derived(origins, wrappedDerive, initial);
	var singleOrigin = !Array.isArray(origins);
	function doReflect(reflecting) {
		var setWith = reflect(reflecting, originValues);
		if (singleOrigin) {
			blockNextDerive = true;
			origins.set(setWith);
		} else {
			setWith.forEach((value, i) => {
				blockNextDerive = true;
				origins[i].set(value);
			});
		}
		blockNextDerive = false;
	}
	var tryingSet = false;
	function update2(fn) {
		var isUpdated, mutatedBySubscriptions, oldValue, newValue;
		if (tryingSet) {
			newValue = fn(get_store_value(childDerived));
			childDerivedSetter(newValue);
			return;
		}
		var unsubscribe = childDerived.subscribe((value) => {
			if (!tryingSet) {
				oldValue = value;
			} else if (!isUpdated) {
				isUpdated = true;
			} else {
				mutatedBySubscriptions = true;
			}
		});
		newValue = fn(oldValue);
		tryingSet = true;
		childDerivedSetter(newValue);
		unsubscribe();
		tryingSet = false;
		if (mutatedBySubscriptions) {
			newValue = get_store_value(childDerived);
		}
		if (isUpdated) {
			doReflect(newValue);
		}
	}
	return {
		subscribe: childDerived.subscribe,
		set(value) {
			update2(() => value);
		},
		update: update2
	};
}
const TOAST_LIMIT = 20;
const toasts = writable([]);
const pausedAt = writable(null);
const toastTimeouts = /* @__PURE__ */ new Map();
const addToRemoveQueue = (toastId) => {
	if (toastTimeouts.has(toastId)) {
		return;
	}
	const timeout = setTimeout(() => {
		toastTimeouts.delete(toastId);
		remove(toastId);
	}, 1e3);
	toastTimeouts.set(toastId, timeout);
};
const clearFromRemoveQueue = (toastId) => {
	const timeout = toastTimeouts.get(toastId);
	if (timeout) {
		clearTimeout(timeout);
	}
};
function update(toast2) {
	if (toast2.id) {
		clearFromRemoveQueue(toast2.id);
	}
	toasts.update(($toasts) => $toasts.map((t) => (t.id === toast2.id ? { ...t, ...toast2 } : t)));
}
function add(toast2) {
	toasts.update(($toasts) => [toast2, ...$toasts].slice(0, TOAST_LIMIT));
}
function upsert(toast2) {
	if (get_store_value(toasts).find((t) => t.id === toast2.id)) {
		update(toast2);
	} else {
		add(toast2);
	}
}
function dismiss(toastId) {
	toasts.update(($toasts) => {
		if (toastId) {
			addToRemoveQueue(toastId);
		} else {
			$toasts.forEach((toast2) => {
				addToRemoveQueue(toast2.id);
			});
		}
		return $toasts.map((t) =>
			t.id === toastId || toastId === void 0 ? { ...t, visible: false } : t
		);
	});
}
function remove(toastId) {
	toasts.update(($toasts) => {
		if (toastId === void 0) {
			return [];
		}
		return $toasts.filter((t) => t.id !== toastId);
	});
}
function startPause(time) {
	pausedAt.set(time);
}
function endPause(time) {
	let diff;
	pausedAt.update(($pausedAt) => {
		diff = time - ($pausedAt || 0);
		return null;
	});
	toasts.update(($toasts) =>
		$toasts.map((t) => ({
			...t,
			pauseDuration: t.pauseDuration + diff
		}))
	);
}
const defaultTimeouts = {
	blank: 4e3,
	error: 4e3,
	success: 2e3,
	loading: Infinity,
	custom: 4e3
};
function useToasterStore(toastOptions = {}) {
	const mergedToasts = writableDerived(
		toasts,
		($toasts) =>
			$toasts.map((t) => ({
				...toastOptions,
				...toastOptions[t.type],
				...t,
				duration:
					t.duration ||
					toastOptions[t.type]?.duration ||
					toastOptions?.duration ||
					defaultTimeouts[t.type],
				style: [toastOptions.style, toastOptions[t.type]?.style, t.style].join(';')
			})),
		($toasts) => $toasts
	);
	return {
		toasts: mergedToasts,
		pausedAt
	};
}
const isFunction = (valOrFunction) => typeof valOrFunction === 'function';
const resolveValue = (valOrFunction, arg) =>
	isFunction(valOrFunction) ? valOrFunction(arg) : valOrFunction;
const genId = /* @__PURE__ */ (() => {
	let count = 0;
	return () => {
		count += 1;
		return count.toString();
	};
})();
const prefersReducedMotion = /* @__PURE__ */ (() => {
	let shouldReduceMotion;
	return () => {
		if (shouldReduceMotion === void 0 && typeof window !== 'undefined') {
			const mediaQuery = matchMedia('(prefers-reduced-motion: reduce)');
			shouldReduceMotion = !mediaQuery || mediaQuery.matches;
		}
		return shouldReduceMotion;
	};
})();
const createToast = (message, type = 'blank', opts) => ({
	createdAt: Date.now(),
	visible: true,
	type,
	ariaProps: {
		role: 'status',
		'aria-live': 'polite'
	},
	message,
	pauseDuration: 0,
	...opts,
	id: opts?.id || genId()
});
const createHandler = (type) => (message, options) => {
	const toast2 = createToast(message, type, options);
	upsert(toast2);
	return toast2.id;
};
const toast = (message, opts) => createHandler('blank')(message, opts);
toast.error = createHandler('error');
toast.success = createHandler('success');
toast.loading = createHandler('loading');
toast.custom = createHandler('custom');
toast.dismiss = (toastId) => {
	dismiss(toastId);
};
toast.remove = (toastId) => remove(toastId);
toast.promise = (promise, msgs, opts) => {
	const id = toast.loading(msgs.loading, { ...opts, ...opts?.loading });
	promise
		.then((p) => {
			toast.success(resolveValue(msgs.success, p), {
				id,
				...opts,
				...opts?.success
			});
			return p;
		})
		.catch((e) => {
			toast.error(resolveValue(msgs.error, e), {
				id,
				...opts,
				...opts?.error
			});
		});
	return promise;
};
function calculateOffset(toast2, $toasts, opts) {
	const { reverseOrder, gutter = 8, defaultPosition } = opts || {};
	const relevantToasts = $toasts.filter(
		(t) => (t.position || defaultPosition) === (toast2.position || defaultPosition) && t.height
	);
	const toastIndex = relevantToasts.findIndex((t) => t.id === toast2.id);
	const toastsBefore = relevantToasts.filter(
		(toast3, i) => i < toastIndex && toast3.visible
	).length;
	const offset = relevantToasts
		.filter((t) => t.visible)
		.slice(...(reverseOrder ? [toastsBefore + 1] : [0, toastsBefore]))
		.reduce((acc, t) => acc + (t.height || 0) + gutter, 0);
	return offset;
}
const handlers = {
	startPause() {
		startPause(Date.now());
	},
	endPause() {
		endPause(Date.now());
	},
	updateHeight: (toastId, height) => {
		update({ id: toastId, height });
	},
	calculateOffset
};
function useToaster(toastOptions) {
	const { toasts: toasts2, pausedAt: pausedAt2 } = useToasterStore(toastOptions);
	const timeouts = /* @__PURE__ */ new Map();
	let _pausedAt;
	const unsubscribes = [
		pausedAt2.subscribe(($pausedAt) => {
			if ($pausedAt) {
				for (const [, timeoutId] of timeouts) {
					clearTimeout(timeoutId);
				}
				timeouts.clear();
			}
			_pausedAt = $pausedAt;
		}),
		toasts2.subscribe(($toasts) => {
			if (_pausedAt) {
				return;
			}
			const now = Date.now();
			for (const t of $toasts) {
				if (timeouts.has(t.id)) {
					continue;
				}
				if (t.duration === Infinity) {
					continue;
				}
				const durationLeft = (t.duration || 0) + t.pauseDuration - (now - t.createdAt);
				if (durationLeft < 0) {
					if (t.visible) {
						toast.dismiss(t.id);
					}
					return null;
				}
				timeouts.set(
					t.id,
					setTimeout(() => toast.dismiss(t.id), durationLeft)
				);
			}
		})
	];
	onDestroy(() => {
		for (const unsubscribe of unsubscribes) {
			unsubscribe();
		}
	});
	return { toasts: toasts2, handlers };
}
function CheckmarkIcon($$payload, $$props) {
	push(false);
	let primary = value_or_fallback($$props['primary'], '#61d345');
	let secondary = value_or_fallback($$props['secondary'], '#fff');
	$$payload.out += `<div${add_styles({
		'--primary': primary,
		'--secondary': secondary
	})} class="svelte-11kvm4p"></div>`;
	bind_props($$props, { primary, secondary });
	pop();
}
function ErrorIcon($$payload, $$props) {
	push(false);
	let primary = value_or_fallback($$props['primary'], '#ff4b4b');
	let secondary = value_or_fallback($$props['secondary'], '#fff');
	$$payload.out += `<div${add_styles({
		'--primary': primary,
		'--secondary': secondary
	})} class="svelte-1ee93ns"></div>`;
	bind_props($$props, { primary, secondary });
	pop();
}
function LoaderIcon($$payload, $$props) {
	push(false);
	let primary = value_or_fallback($$props['primary'], '#616161');
	let secondary = value_or_fallback($$props['secondary'], '#e0e0e0');
	$$payload.out += `<div${add_styles({
		'--primary': primary,
		'--secondary': secondary
	})} class="svelte-1j7dflg"></div>`;
	bind_props($$props, { primary, secondary });
	pop();
}
function ToastIcon($$payload, $$props) {
	push(false);
	let type, icon, iconTheme;
	let toast2 = $$props['toast'];
	({ type, icon, iconTheme } = toast2);
	const anchor = create_anchor($$payload);
	$$payload.out += `${anchor}`;
	if (typeof icon === 'string') {
		$$payload.out += '<!--ssr:if:true-->';
		$$payload.out += `<div class="animated svelte-1kgeier">${escape_text(icon)}</div>`;
	} else {
		$$payload.out += '<!--ssr:if:false-->';
		const anchor_1 = create_anchor($$payload);
		$$payload.out += `${anchor_1}`;
		if (typeof icon !== 'undefined') {
			$$payload.out += '<!--ssr:if:true-->';
			const anchor_2 = create_anchor($$payload);
			$$payload.out += `${anchor_2}`;
			icon?.($$payload, {});
			$$payload.out += `${anchor_2}`;
		} else {
			$$payload.out += '<!--ssr:if:false-->';
			const anchor_3 = create_anchor($$payload);
			$$payload.out += `${anchor_3}`;
			if (type !== 'blank') {
				$$payload.out += '<!--ssr:if:true-->';
				const anchor_4 = create_anchor($$payload);
				const anchor_5 = create_anchor($$payload);
				$$payload.out += `<div class="indicator svelte-1kgeier">${anchor_4}`;
				LoaderIcon($$payload, spread_props([iconTheme]));
				$$payload.out += `${anchor_4} ${anchor_5}`;
				if (type !== 'loading') {
					$$payload.out += '<!--ssr:if:true-->';
					const anchor_6 = create_anchor($$payload);
					$$payload.out += `<div class="status svelte-1kgeier">${anchor_6}`;
					if (type === 'error') {
						$$payload.out += '<!--ssr:if:true-->';
						const anchor_7 = create_anchor($$payload);
						$$payload.out += `${anchor_7}`;
						ErrorIcon($$payload, spread_props([iconTheme]));
						$$payload.out += `${anchor_7}`;
					} else {
						$$payload.out += '<!--ssr:if:false-->';
						const anchor_8 = create_anchor($$payload);
						$$payload.out += `${anchor_8}`;
						CheckmarkIcon($$payload, spread_props([iconTheme]));
						$$payload.out += `${anchor_8}`;
					}
					$$payload.out += `${anchor_6}</div>`;
				} else {
					$$payload.out += '<!--ssr:if:false-->';
				}
				$$payload.out += `${anchor_5}</div>`;
			} else {
				$$payload.out += '<!--ssr:if:false-->';
			}
			$$payload.out += `${anchor_3}`;
		}
		$$payload.out += `${anchor_1}`;
	}
	$$payload.out += `${anchor}`;
	bind_props($$props, { toast: toast2 });
	pop();
}
function ToastMessage($$payload, $$props) {
	push(false);
	let toast2 = $$props['toast'];
	const anchor = create_anchor($$payload);
	$$payload.out += `<div${spread_attributes([{ class: 'message' }, toast2.ariaProps], true, false, 'svelte-1nauejd')}>${anchor}`;
	if (typeof toast2.message === 'string') {
		$$payload.out += '<!--ssr:if:true-->';
		$$payload.out += `${escape_text(toast2.message)}`;
	} else {
		$$payload.out += '<!--ssr:if:false-->';
		const anchor_1 = create_anchor($$payload);
		$$payload.out += `${anchor_1}`;
		toast2.message?.($$payload, { toast: toast2 });
		$$payload.out += `${anchor_1}`;
	}
	$$payload.out += `${anchor}</div>`;
	bind_props($$props, { toast: toast2 });
	pop();
}
function ToastBar($$payload, $$props) {
	push(false);
	let toast2 = $$props['toast'];
	let position = value_or_fallback($$props['position'], void 0);
	let style = value_or_fallback($$props['style'], '');
	let Component = value_or_fallback($$props['Component'], void 0);
	let factor;
	let animation;
	{
		const top = (toast2.position || position || 'top-center').includes('top');
		factor = top ? 1 : -1;
		const [enter, exit] = prefersReducedMotion() ? ['fadeIn', 'fadeOut'] : ['enter', 'exit'];
		animation = toast2.visible ? enter : exit;
	}
	const anchor = create_anchor($$payload);
	$$payload.out += `<div${add_styles(merge_styles(`${stringify(style)}; ${stringify(toast2.style)}`, { '--factor': factor }))}${attr('class', `base ${stringify(toast2.height ? animation : 'transparent')} ${stringify(toast2.className || '')} svelte-ug60r4`, false)}>${anchor}`;
	if (Component) {
		$$payload.out += '<!--ssr:if:true-->';
		const anchor_1 = create_anchor($$payload);
		$$payload.out += `${anchor_1}`;
		Component?.($$payload, {
			$$slots: {
				icon: ($$payload2, $$slotProps) => {
					const anchor_2 = create_anchor($$payload2);
					$$payload2.out += `${anchor_2}`;
					ToastIcon($$payload2, { toast: toast2, slot: 'icon' });
					$$payload2.out += `${anchor_2}`;
				},
				message: ($$payload2, $$slotProps) => {
					const anchor_3 = create_anchor($$payload2);
					$$payload2.out += `${anchor_3}`;
					ToastMessage($$payload2, { toast: toast2, slot: 'message' });
					$$payload2.out += `${anchor_3}`;
				}
			}
		});
		$$payload.out += `${anchor_1}`;
	} else {
		$$payload.out += '<!--ssr:if:false-->';
		const anchor_4 = create_anchor($$payload);
		$$payload.out += `${anchor_4}`;
		slot(
			$$payload,
			$$props.children,
			{
				ToastIcon,
				ToastMessage,
				get toast() {
					return toast2;
				}
			},
			() => {
				const anchor_5 = create_anchor($$payload);
				const anchor_6 = create_anchor($$payload);
				$$payload.out += `${anchor_5}`;
				ToastIcon($$payload, { toast: toast2 });
				$$payload.out += `${anchor_5} ${anchor_6}`;
				ToastMessage($$payload, { toast: toast2 });
				$$payload.out += `${anchor_6}`;
			}
		);
		$$payload.out += `${anchor_4}`;
	}
	$$payload.out += `${anchor}</div>`;
	bind_props($$props, { toast: toast2, position, style, Component });
	pop();
}
function ToastWrapper($$payload, $$props) {
	push(false);
	let top, bottom, factor, justifyContent;
	let toast2 = $$props['toast'];
	let setHeight = $$props['setHeight'];
	top = toast2.position?.includes('top') ? 0 : null;
	bottom = toast2.position?.includes('bottom') ? 0 : null;
	factor = toast2.position?.includes('top') ? 1 : -1;
	justifyContent =
		(toast2.position?.includes('center') && 'center') ||
		((toast2.position?.includes('right') || toast2.position?.includes('end')) && 'flex-end') ||
		null;
	const anchor = create_anchor($$payload);
	$$payload.out += `<div${add_styles({
		'--factor': factor,
		'--offset': toast2.offset,
		top,
		bottom,
		'justify-content': justifyContent
	})}${attr(
		'class',
		`wrapper svelte-v01oml ${stringify(
			[toast2.visible ? 'active' : '', !prefersReducedMotion() ? 'transition' : '']
				.filter(Boolean)
				.join(' ')
		)}`,
		false
	)}>${anchor}`;
	if (toast2.type === 'custom') {
		$$payload.out += '<!--ssr:if:true-->';
		const anchor_1 = create_anchor($$payload);
		$$payload.out += `${anchor_1}`;
		ToastMessage($$payload, { toast: toast2 });
		$$payload.out += `${anchor_1}`;
	} else {
		$$payload.out += '<!--ssr:if:false-->';
		const anchor_2 = create_anchor($$payload);
		$$payload.out += `${anchor_2}`;
		slot(
			$$payload,
			$$props.children,
			{
				get toast() {
					return toast2;
				}
			},
			() => {
				const anchor_3 = create_anchor($$payload);
				$$payload.out += `${anchor_3}`;
				ToastBar($$payload, { toast: toast2, position: toast2.position });
				$$payload.out += `${anchor_3}`;
			}
		);
		$$payload.out += `${anchor_2}`;
	}
	$$payload.out += `${anchor}</div>`;
	bind_props($$props, { toast: toast2, setHeight });
	pop();
}
function Toaster($$payload, $$props) {
	push(false);
	const $$store_subs = {};
	let reverseOrder = value_or_fallback($$props['reverseOrder'], false);
	let position = value_or_fallback($$props['position'], 'top-center');
	let toastOptions = value_or_fallback($$props['toastOptions'], void 0);
	let gutter = value_or_fallback($$props['gutter'], 8);
	let containerStyle = value_or_fallback($$props['containerStyle'], void 0);
	let containerClassName = value_or_fallback($$props['containerClassName'], void 0);
	const { toasts: toasts2, handlers: handlers2 } = useToaster(toastOptions);
	let _toasts;
	_toasts = store_get($$store_subs, '$toasts', toasts2).map((toast2) => ({
		...toast2,
		position: toast2.position || position,
		offset: handlers2.calculateOffset(toast2, store_get($$store_subs, '$toasts', toasts2), {
			reverseOrder,
			gutter,
			defaultPosition: position
		})
	}));
	const anchor = create_anchor($$payload);
	const each_array = ensure_array_like(_toasts);
	$$payload.out += `<div${attr('class', `toaster ${stringify(containerClassName || '')} svelte-1phplh9`, false)}${attr('style', containerStyle, false)} role="alert">${anchor}`;
	for (let $$index = 0; $$index < each_array.length; $$index++) {
		const toast2 = each_array[$$index];
		const anchor_1 = create_anchor($$payload);
		const anchor_2 = create_anchor($$payload);
		$$payload.out += `${anchor_1}${anchor_2}`;
		ToastWrapper($$payload, {
			toast: toast2,
			setHeight: (height) => handlers2.updateHeight(toast2.id, height)
		});
		$$payload.out += `${anchor_2}${anchor_1}`;
	}
	$$payload.out += `${anchor}</div>`;
	unsubscribe_stores($$store_subs);
	bind_props($$props, {
		reverseOrder,
		position,
		toastOptions,
		gutter,
		containerStyle,
		containerClassName
	});
	pop();
}
function Footer($$payload, $$props) {
	push(false);
	const year = /* @__PURE__ */ /* @__PURE__ */ new Date().getFullYear();
	$$payload.out += `<footer class="w-full border-t-2 border-black bg-white"><div class="mx-auto max-w-2xl w-full"><p class="text-sm text-black font-bold text-center py-6">© ${escape(year)} omfj</p></div></footer>`;
	pop();
}
function _layout($$payload, $$props) {
	push(true);
	let { data } = $$props;
	setUserContext(data.user);
	const anchor = create_anchor($$payload);
	const anchor_1 = create_anchor($$payload);
	const anchor_2 = create_anchor($$payload);
	const anchor_3 = create_anchor($$payload);
	$$payload.out += `<div class="flex flex-col min-h-screen">${anchor}`;
	Header($$payload);
	$$payload.out += `${anchor} <main class="max-w-4xl mx-auto w-full py-8 px-4">${anchor_1}`;
	slot($$payload, $$props.children, {}, null);
	$$payload.out += `${anchor_1}</main> <div class="flex-grow"></div> ${anchor_2}`;
	Footer($$payload);
	$$payload.out += `${anchor_2}</div> ${anchor_3}`;
	Toaster($$payload, {});
	$$payload.out += `${anchor_3}`;
	bind_props($$props, { data });
	pop();
}
export { _layout as default };
