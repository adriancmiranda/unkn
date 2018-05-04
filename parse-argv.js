const reOPT = /^--?(.+)/;
const reSEP = /=/;

const readOnly = (value) => ({
	writable: false,
	value,
});

const defaultProperties = (argv) => ({
	_: readOnly([]),
	$: readOnly(argv),
});

const opts = (keys, key, index, argv) => {
	const values = key.split(reSEP);
	let property = key.replace(reOPT, '$1');
	let value = argv[index + 1];
	if (values.length === 1) {
		value = true;
	} else if (values.length === 2) {
		property = values[0].replace(reOPT, '$1');
		value = values[1];
	}
	if (property in keys) {
		keys[property] = [keys[property]].concat([value]);
	} else {
		keys[property] = value;
	}
	return keys;
};

const reducer = (keys, key, index, argv) => {
	if (reOPT.test(key)) {
		keys = opts(keys, key, index, argv);
	} else if (index > 1) {
		keys._[keys._.length] = key;
	}
	return keys;
};

module.exports = (customArgv) => {
	const argv = customArgv instanceof Array ? customArgv : process.argv;
	const initialValue = Object.create(null, defaultProperties(argv));
	return argv.reduce(reducer, initialValue);
};
