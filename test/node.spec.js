import test from 'ava';
import node from '..';

test('node / import', t => {
	// 1
	t.is(node(
		 `import * as internal from './internal/index.js';`
	), `const internal = require('./internal/index.js');`, '\': should convert to commonjs and keep the code style');

	// 2
	t.is(node(
		 `import * as  internal from "./internal/index.js";`
	), `const internal = require("./internal/index.js");`, '": should convert to commonjs and keep the code style');

	// 3
	t.is(node(
		 `import * as internal from \`./internal/index.js\`;`
	), `const internal = require(\`./internal/index.js\`);`, '`: should convert to commonjs and keep the code style');

	// 4
	t.is(node(
		 `import { TEST_STRING } from '../internal/constants.js';`
	), `const { TEST_STRING } = require('../internal/constants.js');`, 'should keep the import style 4 single property');

	// 5
	t.is(node(
		 `import { TEST_STRING, FN } from '../internal/constants.js';`
	), `const { TEST_STRING, FN } = require('../internal/constants.js');`, 'should keep the import style more properties');

	// 6
	t.is(node(`import { TEST_STRING, FN } from '../internal/constants.next.js';`, {
		match: '.next.js',
		replaceBy: '.js',
	}), `const { TEST_STRING, FN } = require('../internal/constants.js');`, 'match string: should remove the `.next.js` suffix');

	// 7
	t.is(node(`import { TEST_STRING, FN } from '../internal/constants.next.js';`, {
		match: /.next(.js['"`]?)/,
		replaceBy: '$1',
	}), `const { TEST_STRING, FN } = require('../internal/constants.js');`, 'match regexp: should remove the `.next.js` suffix');
});

test('node / export', t => {
	// 1
	t.is(node(
		 `export * from './internal/index.js';`
	), [
		`const $val0 = require('./internal/index.js');`,
		`for (const $key0 in $val0) if ($key0 == 'default' === false) exports[$key0] = $val0[$key0];`,
	].join('\n'), 'should export all properties from a script');

	// 2
	t.is(node(
		 `export { has, is }`
	), [
		`exports.has = has`,
		`exports.is = is`,
	].join('\n'), 'should export all properties from a content expression');

	// 3
	t.is(node(
		 `export { default as schema } from './schema/index.js';`
	), `exports.schema = require('./schema/index.js');`, 'should export as schema default property');

	// 4
	t.is(node(`export const NUMBER = 'number';`), `exports.NUMBER = 'number';`, 'should export correctly');

	// 5
	t.is(node([
		 `export const NUMBER = 'number';`,
		 'export const NUMBER_OR_FUNCTION = `${exports.NUMBER}|function`;',
	].join('\n')), [
		`exports.NUMBER = 'number';`,
		'exports.NUMBER_OR_FUNCTION = `${exports.NUMBER}|function`;',
	].join('\n'), 'should keep the read property');

	// 6
	t.is(node([
		`function schematize(patterns, settings) {`,
			`console.log('patterns:%o\nsettings:%o', patterns, settings);`,
		`}`,
		`export default schematize;`,
	].join('\n')), [
		`function schematize(patterns, settings) {`,
			`console.log('patterns:%o\nsettings:%o', patterns, settings);`,
		`}`,
		`module.exports = schematize;`
	].join('\n'), 'should export all properties from a content expression');

	// 7
	t.is(node([
		`export default function at(context, key) {`,
			`if (context === undefined || context === null) return false;`,
			`return context[key] === undefined === false;`,
		`}`,
	].join('\n')), [
		`module.exports = function at(context, key) {`,
			`if (context === undefined || context === null) return false;`,
			`return context[key] === undefined === false;`,
		`}`,
	].join('\n'));

	// 8
	t.is(node([
		`export default class Rectangle {`,
			`constructor(height, width) {`,
				`this.height = height;`,
				`this.width = width;`,
			`}`,
		`}`,
	].join('\n')), [
		`module.exports = class Rectangle {`,
			`constructor(height, width) {`,
				`this.height = height;`,
				`this.width = width;`,
			`}`,
		`}`,
	].join('\n'));
});
