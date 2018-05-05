import test from 'ava';
import cross from 'cross-spawn';
import { array } from '../utilities';

const spawn = (args) => {
	cross.sync('../cli.js', array(args) ? args : []);
};

test('cli', t => {
	t.pass();
});
