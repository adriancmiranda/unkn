import test from 'ava';
import cross from 'cross-spawn';
import isArray from '../utilities/isArray';

const spawn = (args) => {
	cross.sync('../cli.js', isArray(args) ? args : []);
};

test('cli', t => {
	t.pass();
});
