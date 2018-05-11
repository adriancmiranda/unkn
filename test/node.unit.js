import test from 'ava';
import colors from 'colors';
import node from '../index';
import * as fixturesReader from '../fixtures/reader';

fixturesReader.walk((actual, expected, dir) => {
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
	})
});
