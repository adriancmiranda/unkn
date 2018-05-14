const isArray = require('./isArray');
const deepAssigner = require('./deepAssigner');

module.exports = deepAssigner((value, target) => {
	if (isArray(target)) {
		return target.concat(value);
	}
	return value;
});
