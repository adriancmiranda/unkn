module.exports = class {}

module.exports = class Rect{}

module.exports = class Point {
	constructor(x, y) {
		this.x = x >>> 0;
		this.y = y >>> 0;
	}
}

module.exports = function() {}

module.exports = function foo() {}

module.exports = function foo(arg1, $arg2, _arg3) {
	return ['foo', 'bar', 1];
}

module.exports = () => {}

module.exports = () => 'foo';

module.exports = (value) => (
	typeof value === 'string' || value instanceof String;
);

module.exports = (arg, $arg, _arg) => 'foo';

module.exports = (arg1, $arg2, _arg3) => {
	if (_arg3) {
		return { arg1, $arg2 };
	}
	const bar = 'baz';
	return { bar };
};

const baz = function() {};
module.exports = baz;

module.exports = {};

const test = "test";
module.exports = { // default
  bar() {},
  foo: "foo",
  baz: 2,
  *gen() {},
  test
};
