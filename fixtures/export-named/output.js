const status = 'foo';
exports.foo = status;

const ok = 'bar';
exports.bar = ok;

const foo = 'foo';
const bar = 'bar';
const baz = 'baz';
exports.FOO = foo;
exports.BAR = bar;
exports.baz = baz;

const test = "test";
exports.test = test;

const $module = {exports: {}};
$module.exports.foo = "foo";
module.exports = $module.exports;
