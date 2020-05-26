import colors from 'colors';
import node from '../index';
import { version } from '../package.json';
import fixturesReader from '../fixtures/reader';

describe('transform', () => {
	expect(typeof node).toBe('function', 'should be a function');
	expect(toString.call(node)).toBe('[object Function]', 'should be undefined');
});

describe('transform.VERSION', () => {
	expect(node.VERSION).toBe(version, 'should be the same VERSION');
});

fixturesReader('combined', (actual, expected, dir) => {
	describe(`${dir.name}`, () => {
		const output = node(actual, { pattern: '.next.js', replacement: '.js' });
		expect(output).toBe(expected, `${
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
