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

const $val0 = require('./internal/index.next.js');
for (const $key0 in $val0) if ($key0 === 'default' === false) exports[$key0] = $val0[$key0];
exports.has = has;
exports.is = is;
exports.schema = require('./schema/index.next.js');
