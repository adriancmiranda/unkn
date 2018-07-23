const isString = require('./isString');
const create = require('./create');

const wm = new WeakMap();

module.exports = (action, scope) => {
	if (isString(action) && action in wm) {
		wm[action](scope);
	}
	if (wm.has(action) === false) {
		wm.set(action, create(null));
	}
	return wm.get(action);
};
