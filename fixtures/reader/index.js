const { resolve, join } = require('path');
const { statSync, readdirSync, readFileSync } = require('fs');
const isCallable = require('../../common/isCallable');
const noop = require('../../common/noop');

const fixturesPath = resolve('fixtures');
const fixturesDir = readdirSync(fixturesPath);

function readDir(name, next) {
	if (/^(reader|library)$/g.test(name)) return;
	const iterator = isCallable(next) ? next : noop;
	const path = join(fixturesPath, name);
	const actual = readFileSync(join(path, 'input.js'), 'utf-8');
	const expected = readFileSync(join(path, 'output.js'), 'utf-8');
	return next(actual, expected, { name, path });
}

function walk(next) {
	fixturesDir.map((name) => ({ path: join(fixturesPath, name), name }))
	.filter((dir) => statSync(dir.path).isDirectory())
	.forEach((dir) => readDir(dir.name, next));
}

module.exports = (...rest) => {
	if (rest.length < 2) return walk(rest[0]);
	return readDir(rest[0], rest[1]);
};
