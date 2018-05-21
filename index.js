const { inspect } = require('util');
const { parse } = require('acorn');
const { version } = require('./package.json');
const { replace } = require('./options');
const toPascalCase = require('./common/toPascalCase');
const isCallable = require('./common/isCallable');
const isString = require('./common/isString');
const isArray = require('./common/isArray');
const assign = require('./common/assign');

class ESx {
	constructor(source, options) {
		this.tokens = [];
		this.comments = [];
		this.options = replace(options);
		this.source = isString(source) ? source : '';
		try {
			this.ast = parse(this.source, this.mountOptions(this.options));
		} catch (err) {
			console.error(options.file, err);
		}
	}

	mountOptions(options) {
		return assign({
			ecmaVersion: 7,
			sourceType: 'module',
			allowImportExportEverywhere: true,
			allowReturnOutsideFunction: true,
			onComment: this.comments,
			onToken: this.tokens,
		}, options);
	}

	parse() {
		const lineBreak = '\n';
		const body = this.ast.body.reduce(this.reduceNode.bind(this), []);
		return `${body.join(lineBreak)}${lineBreak}`;
	}

	reduceNode(accumulator, node) {
		const compile = this[node.type];
		if (isCallable(compile)) {
			accumulator[accumulator.length] = compile.call(this, node);
		} else {
			accumulator[accumulator.length] = this.source.substring(node.start, node.end);
		}
		return accumulator;
	}

	ImportDeclaration(node) {
		const uri0 = node.source ? node.source.value : '';
		const uriF = uri0.replace(this.options.pattern, this.options.replacement);
		const specifiers = node.specifiers || [];
		return specifiers.reduce((accumulator, item, index, list) => {
			const output = `const ${item.local.name} = require('${uriF}');`;
			accumulator[accumulator.length] = output;
			return accumulator;
		}, []);
	}

	ExportAllDeclaration(node) {
		const uri0 = node.source ? node.source.value : '';
		const uriF = uri0.replace(this.options.pattern, this.options.replacement);
		return [
		'(function (resource) {',
		'\tfor (const name in resource) {',
		'\t\tif (name === \'default\' === false) {',
		'\t\t\tthis[name] = resource[name];',
		'\t\t}',
		'\t}',
		`}).call(exports, require('${uriF}'));`].join('\n');
	}

	ExportNamedDeclaration(node) {
		const uri0 = node.source ? node.source.value : '';
		const uriF = uri0.replace(this.options.pattern, this.options.replacement);
		const specifiers = node.specifiers || [];
		return specifiers.reduce((accumulator, item, index, list) => {
			let output;
			if (item.local.name === 'default') {
				output = `exports.${item.exported.name} = require('${uriF}');`;
			} else {
				output = `exports.${item.exported.name} = ${item.local.name};`;
			}
			accumulator[accumulator.length] = output;
			return accumulator;
		}, []).join('\n');
	}
}

module.exports = (source, options) => new ESx(source, options).parse();
module.exports.VERSION = version;
