const isString = require('./isString');
const pattern = /\r\n/g;
module.exports = value => {
	const val = isString(value) ? value : '';
	pattern.lastIndex = 0;
	return val.replace(pattern, '\n').trimRight();
};
module.exports.pattern = pattern;
