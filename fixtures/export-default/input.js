export default class {}

export default class Rect{}

export default class Point {
	constructor(x, y) {
		this.x = x >>> 0;
		this.y = y >>> 0;
	}
}

export default function() {}

export default function foo() {}

export default function foo(arg1, $arg2, _arg3) {
	return ['foo', 'bar', 1];
}

export default () => {}

export default () => 'foo';

export default (value) => (
	typeof value === 'string' || value instanceof String;
);

export default (arg, $arg, _arg) => 'foo';

export default (arg1, $arg2, _arg3) => {
	if (_arg3) {
		return { arg1, $arg2 };
	}
	const bar = 'baz';
	return { bar };
};

const baz = function() {};
export default baz;

export default {};

const test = "test";
export default { // default
  bar() {},
  foo: "foo",
  baz: 2,
  *gen() {},
  test
};
