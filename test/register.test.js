import register from '../register';
import * as fixtures from '../fixtures/library/index.registered';

describe('register', () => {
	expect(toString.call(fixtures)).toBe('[object Object]', 'should be an object');
	// expect(toString.call(fixtures.default)).toBe('[object Object]', 'should have default object');
});
