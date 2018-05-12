const isArray = require('./isArray.js');
const isCallable = require('./isCallable.js');
const isObject = require('./isObject.js');
const arrayFrom = require('./arrayFrom');
const keys = require('./keys');
module.exports = (strategy) => {
	let notation = '';
	return function assign(target) {
		const args = arrayFrom(arguments);
		const output = target == null ? {} : target;
		for (let ix = 1; ix < args.length; ix += 1) {
			const from = args[ix];
			const keyList = keys(from);
			for (let iy = 0; iy < keyList.length; iy += 1) {
				const key = keyList[iy];
				const outputValue = output[key];
				const sourceValue = from[key];
				if (isArray(outputValue) || isArray(sourceValue)) {
					const f = arrayFrom(sourceValue);
					const o = arrayFrom(outputValue);
					output[key] = strategy(f, o, `${notation}.${key}`, keyList);
				} else if (isCallable(outputValue) || isCallable(sourceValue)) {
					output[key] = strategy(sourceValue, outputValue, `${notation}.${key}`, keyList);
				} else if (object(outputValue) || object(sourceValue)) {
					const cacheNotation = notation;
					notation = (cacheNotation ? `${cacheNotation}.` : '') + key;
					output[key] = assign(outputValue, sourceValue);
					notation = cacheNotation;
				} else {
					output[key] = strategy(sourceValue, outputValue, `${notation}.${key}`, keyList);
				}
			}
		}
		return output;
	};
};
