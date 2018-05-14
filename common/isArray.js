module.exports = value => {
	if (value === undefined || value === null) return false;
	return value instanceof Array;
};
