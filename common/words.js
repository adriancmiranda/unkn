const isString = require('./isString');

module.exports = (value, pattern) => {
	value = isString(value) ? value : '';
	return pattern instanceof RegExp ?
	value.match(pattern) :
	value.split(/\s|-|_/g);
};
