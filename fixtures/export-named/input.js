const status = 'foo';
export {status as foo};

const ok = 'bar';
export {ok as bar};

const foo = 'foo';
const bar = 'bar';
const baz = 'baz';
export {foo as FOO, bar as BAR, baz};

const test = "test";
export {test};

const $module = {exports: {}};
$module.exports.foo = "foo";
export default $module.exports;

export * from './internal/index.next.js';
export { has, is };
export { default as schema } from './schema/index.next.js';
