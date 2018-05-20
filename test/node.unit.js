import test from 'ava';
import colors from 'colors';
import node from '../index';
import { version } from '../package.json';
import fixturesReader from '../fixtures/reader';

test('transform', t => {
	t.is(typeof node, 'function', 'should be a function');
	t.is(toString(node), '[object Undefined]', 'should be undefined');
});

test('transform.VERSION', t => {
	t.is(node.VERSION, version, 'should be the same VERSION');
});

fixturesReader((actual, expected, dir) => {
	test(`${dir.name}`, t => {
		const output = node(actual);
		t.is(output, expected, `${
		colors.green(
			`\`\`\`actual\n${
				actual
			}\`\`\``
		)}\n${colors.yellow(
			`\`\`\`expected\n${
				expected
			}\`\`\``
		)}\n${colors.red(
			`\`\`\`output\n${
				output
			}\`\`\``
		)}`);
	});
});
