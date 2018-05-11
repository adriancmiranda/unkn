const status = 'foo';
export {status as foo};

const ok = 'bar';
export {ok as bar};

const foo = "foo";
export {foo};

const $module = {exports: {}};
$module.exports.foo = "foo";
export default $module.exports;
