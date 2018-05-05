import test from 'ava';
import register from '../register';
import * as fixtures from '../fixtures/index.registered';

console.log(fixtures);
test('register', t => {
	t.pass();
});
