const isString = require('./isString');
const isRegExp = require('./isRegExp');
const escapeRegExp = require('./escapeRegExp');

module.exports = (value) => {
	if (isRegExp(value)) {
		return value;
	} else if (isRegExp.string(value)) {
		const match = value.match(isRegExp.reRegExp);
		return new RegExp(match[1], match[2]);
	} else if (isString(value)) {
		return new RegExp(escapeRegExp(value));
	}
	return /(?:)/;
};
