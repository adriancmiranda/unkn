/* eslint-disable no-unused-vars */
const internal = require('./internal/index.js');
const has = require("./has/index.js");
const is = require(`./is/index.js`);

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
