const isString = require('./isString');
const pattern = /[-[\]{}()*+?.,\\^$|#\s]/g;
module.exports = value => {
	const val = isString(value) ? value : '';
	pattern.lastIndex = 0;
	return val.replace(pattern, '\\$&');
};
module.exports.pattern = pattern;
