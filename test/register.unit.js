import test from 'ava';
import register from '../register.next';
import * as fixtures from '../fixtures/library/index.registered';

test('register', t => {
	t.is(toString.call(fixtures), '[object Object]', 'should be an object');
	t.is(toString.call(fixtures.default), '[object Object]', 'should have default object');
});
