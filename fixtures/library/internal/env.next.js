// environment
export const inBrowser = new Function('try{return this===window;}catch(err){return false;}')();
export const inNode = new Function('try{return this===global;}catch(err){return false;}')();
export const env = exports.inNode ? global : window; // `exports.inNode` is a limitation yet =(
