const ensureRegExp = require('./common/ensureRegExp');
const isCallable = require('./common/isCallable');
const isRegExp = require('./common/isRegExp');
const isString = require('./common/isString');
const isArray = require('./common/isArray');
const create = require('./common/create');

const reTrimList = /\s*(,)\s*/g;
const reSingleComma = /^[^,]+,[^,]+$/;

const validatePattern = (value) => (
	isString(value) || isRegExp(value)
);

const validateReplacement = (value) => (
	isString(value) || isCallable(value)
);

const validateString = (value) => (
	isString(value) && reSingleComma.test(value)
);

const validateArray = (value) => (
	isArray(value) && value.length === 2 &&
	validatePattern(value[0]) &&
	validateReplacement(value[1])
);

const validateObject = (value) => {
	if (value === undefined || value === null) return false;
	return validatePattern(value.pattern) && validateReplacement(value.replacement);
};

const split = (value) => {
	if (validateArray(value)) return value;
	if (validateObject(value)) return [value.pattern, value.replacement];
	if (validateString(value)) return value.replace(reTrimList, '$1').split(',');
	return [];
};

exports.replace = (value) => {
	const replace = split(value);
	const options = create(null);
	options.pattern = ensureRegExp(replace[0]);
	options.replacement = validateReplacement(replace[1]) ? replace[1] : '';
	return options;
};
