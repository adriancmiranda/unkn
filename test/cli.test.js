import fs from 'fs';
import path from 'path';
import cross from 'cross-spawn';
import isArray from '../common/isArray';
import isString from '../common/isString';


const unkn = (args) => {
	const opts = isArray(args) ? args : isString(args) ? [args] : [];
	return cross.sync('../cli.js', opts)
};

describe('cli', () => {
	const actual = unkn(path.resolve('fixtures/combined/input.js'));
	const expected = fs.readFileSync(path.resolve('fixtures/combined/output.js'), 'utf-8');
	expect(actual).toBe(expected);
});
