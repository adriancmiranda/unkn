const { resolve, join } = require('path');
const { statSync, readdirSync, readFileSync } = require('fs');
const isCallable = require('../../common/isCallable');

function read(next, dir) {
	if (/^(reader|library)$/g.test(dir.name)) return;
	const actual = readFileSync(`${dir.path}/input.js`, 'utf-8');
	const expected = readFileSync(`${dir.path}/output.js`, 'utf-8');
	return next(actual, expected, dir);
}

function walk(next) {
	const iterator = isCallable(next) ? next : Function.prototype;
	const testsPath = resolve('fixtures');
	readdirSync(testsPath).map((item) => ({
		path: join(testsPath, item),
		name: item,
	})).filter((item) => (
		statSync(item.path).isDirectory()
	)).forEach(read.bind(null, iterator));
}

exports.read = read;
exports.walk = walk;
