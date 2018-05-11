// environment
exports.inNode = new Function('try{return this===global;}catch(err){return false;}')();
exports.env = exports.inNode ? global : window; // sadly you should to use `exports.inNode` instead inNode directly

// https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export
let k; export default k = 12;
