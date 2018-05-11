/**
 *
 * @function
 * @param {Array|arraylike} value
 * @param {Function} cmd
 * @param {any} context
 * @returns {?}
 */
export default function each(value, cmd, context, keepReverse) {
	if (value === undefined || value === null) return undefined;
	const size = (0 | value.length) - 1;
	for (let index = size; index > -1; index -= 1) {
		const i = keepReverse ? index : size - index;
		const item = value[i];
		const resolve = cmd.call(context || item, item, i, value, i);
		if (resolve === undefined === false) {
			return resolve;
		}
	}
	return undefined;
}
