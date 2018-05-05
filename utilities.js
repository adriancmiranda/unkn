exports.reEscapeRegExp = /[-[\]{}()*+?.,\\^$|#\s]/g;

exports.escapeRegExp = (value) => {
	exports.reEscapeRegExp.lastIndex = 0;
	value = exports.string(value) ? value : '';
	return value.replace(exports.reEscapeRegExp, '\\$&');
};

exports.string = (value) => (
	typeof value === 'string' || value instanceof String
);

exports.callable = (value) => (
	typeof value === 'function'
);

exports.regexp = (value) => (
	value instanceof RegExp
);

exports.array = (value) => (
	value instanceof Array
);
