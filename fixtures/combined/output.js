/* eslint-disable no-unused-vars */
const internal = require('./internal/index.js');
const has = require("./has/index.js");
const is = require(`./is/index.js`);

const $valInternalIndex = require('./internal/index.js');
for (const $keyInternalIndex in $valInternalIndex) {
	if ($keyInternalIndex === 'default' === false) {
		exports[$keyInternalIndex] = $valInternalIndex[$keyInternalIndex];
	}
};
exports.has = has;
exports.is = is;
exports.schema = require('./schema/index.js');
