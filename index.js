const colors = require('colors');
const { parse } = require('acorn');
const { attachComments, generate } = require('escodegen');
const { version } = require('./package.json');
const { replace } = require('./options');
const toPascalCase = require('./common/toPascalCase');
const isCallable = require('./common/isCallable');
const isString = require('./common/isString');
const isArray = require('./common/isArray');
const assign = require('./common/assign');

class Unkn {
	constructor(source, options) {
		this.tokens = [];
		this.comments = [];
		this.options = replace(options);
		this.source = isString(source) ? source : '';
		try {
			this.ast = parse(this.source, this.mountOptions(this.options));
		} catch (err) {
			this.thrown(err);
		}
	}

	thrown(err) {
		const filename = this.options.file ? `${colors.underline(this.options.file)}:` : '';
		const srcLines = this.source.split(/\r\n?|\n|\u2028|\u2029/);
		const lineErr = srcLines[err.loc.line - 1];
		console.error(srcLines.reduce((acc, line, index) => {
			if (index < err.loc.line - 1) {
				acc[acc.length] = colors.green(line);
			} else if (index === err.loc.line - 1) {
				acc[acc.length] = colors.green(lineErr.substring(0, err.loc.column)) +
				colors.red(lineErr.substring(err.loc.column, err.loc.column + 1)) +
				colors.red.underline(lineErr.substring(err.loc.column + 1, lineErr.length)) +
				colors.red(`\n${new Array(err.loc.column + 1).join(' ')}^`);
			} else {
				acc[acc.length] = colors.red.underline(line);
			}
			return acc;
		}, [filename]).join('\n'));
	}

	mountOptions(options) {
		return assign({
			ecmaVersion: 7,
			sourceType: 'module',
			allowImportExportEverywhere: true,
			allowReturnOutsideFunction: true,
			onComment: this.comments,
			onToken: this.tokens,
			ranges: true,
		}, options);
	}

	parse() {
		if (this.ast) {
			const lineBreak = '\n';
			const body = this.ast.body.reduce(this.reduceNode.bind(this), []);
			return `${body.join(lineBreak)}${lineBreak}`;
		}
		return this.source;
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

	ImportBare(node) {
		const uri0 = node.source ? node.source.value : '';
		const uriF = uri0.replace(this.options.pattern, this.options.replacement);
		return `require('${uriF}');`;
	}

	ImportDeclaration(node) {
		if (node.specifiers.length === 0) return this.ImportBare(node);
		const uri0 = node.source ? node.source.value : '';
		const uriF = uri0.replace(this.options.pattern, this.options.replacement);
		const specifiers = node.specifiers || [];
		return specifiers.reduce((accumulator, item) => {
			const output = `const ${item.local.name} = require('${uriF}');`;
			accumulator[accumulator.length] = output;
			return accumulator;
		}, []).join('\n');
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
		if (node.declaration) return this.ExportDeclaration(node);
		const uri0 = node.source ? node.source.value : '';
		const uriF = uri0.replace(this.options.pattern, this.options.replacement);
		const specifiers = node.specifiers || [];
		return specifiers.reduce((accumulator, item) => {
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

	ExportDefaultDeclaration(node) {
		const declaration = node.declaration;
		const source = this.source.substring(declaration.start, declaration.end);
		return `module.exports = ${source}`;
	}

	ExportDeclaration(node) {
		const source = this.source.substring(node.start, node.end);
		const declaration = node.declaration;
		const declarations = declaration.declarations || [];
		return declarations.reduce((accumulator, item) => {
			const name = this.source.substring(item.id.start, item.id.end);
			const value = this.source.substring(item.init.start, item.init.end);
			accumulator[accumulator.length] = `exports.${name} = ${value};`;
			return accumulator;
		}, []).join('\n');
	}
}

module.exports = (source, options) => new Unkn(source, options).parse();
module.exports.VERSION = version;
