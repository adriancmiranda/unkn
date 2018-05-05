const { readFileSync } = require('fs');
const transform = require('.');

const cache = require.extensions['.js'];
require.extensions['.js'] = (module, filename) => {
	return (options) => {
		let source;
		if (filename.indexOf('node_modules') === -1) {
			source = readFileSync(filename, 'utf8');
			module._compile(transform(source, options), filename);
		} else if (cache) {
			cache(module, filename);
		} else {
			source = readFileSync(filename, 'utf8');
			module._compile(source, filename);
		}
	};
};
