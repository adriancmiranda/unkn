const isString = require('./isString');
const reRegExp = /^\/([\s\S]*)\/((?:([gimuy])(?!.*\3)){0,5})$/;
module.exports = value => {
	if (value === undefined || value === null) return false;
	return value instanceof RegExp;
};
module.exports.reRegExp = reRegExp;
module.exports.string = value => {
	if (isString(value)) {
		reRegExp.lastIndex = 0;
		return reRegExp.test(value);
	}
	return false;
};
