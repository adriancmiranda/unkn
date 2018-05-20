const isString = require('./isString');

module.exports = (value) => {
	value = isString(value) ? value : '';
	return value.charAt(0).toUpperCase() + value.substring(1);
};
