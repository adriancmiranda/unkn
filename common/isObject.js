module.exports = value => (
	toString.call(value) === '[object Object]'
);
