const status = 'foo';
exports.foo = status;

const ok = 'bar';
exports.bar = ok;

const foo = "foo";
exports.foo = foo;

const $module = {exports: {}};
$module.exports.foo = "foo";
module.exports = $module.exports;
