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

(function (resource) {
	for (const name in resource) {
		if (name === 'default' === false) {
			this[name] = resource[name];
		}
	}
}).call(exports, require('./internal/index.js'));
exports.has = has;
exports.is = is;
exports.schema = require('./schema/index.js');
