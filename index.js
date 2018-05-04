const reImportExpressionSep = /\s+as\s+/;
const reImportExpressionWithDefault = /^(?!\{)(?:([0-9a-zA-Z_]+))\s*,\s*(\{?\s*[*0-9a-zA-Z_,\s]+\s*\}?)\s+/;
const reImportDeclaration = /^(?!\/\/|\*)import\s+(((?:[0-9a-zA-Z_]+\s*,\s*)?\{?\s*[*0-9a-zA-Z_,\s]+\s*\}?)\s+from\s+)?(['"`][0-9a-zA-Z_\s-.\/]+['"`])/gm;
const reExportDeclaration = /^export\s+(default)?\s*(const|let|var|class|interface|function|\(.*\)|\*\s+from\s+['"`][0-9a-zA-Z_\s-.\/]+['"`]|[0-9a-zA-Z_{*\s,}]+from\s+['"`][0-9a-zA-Z_\s-.\/]+['"`]|[0-9a-zA-Z_{}\s*,]+)?\s*([0-9a-zA-Z_]+)?/gm;

function reduceImportExpression(uri, list, item) {
	const chunk = item.replace(reImportExpressionSep, ',').split(',');
	if (chunk.length === 1) {
		list[list.length] = `const ${chunk[0]} = require(${uri})`;
	} else {
		list[list.length] = `const ${chunk[1]} = require(${uri}).${chunk[0]}`;
	}
	return list;
}

function parseExpression(match, $exp, $uri, offset, string) {
	if (/^\{\s*|\s*\}$/g.test($exp)) {
		const list = $exp.replace(/^\{\s*|\s*(,)\s*|\s*\}$/g, '$1');
		const reducer = reduceImportExpression.bind(this, $uri);
		const expressions = list.split(',').reduce(reducer, []);
		return expressions.join('\n');
	} else if (/\*\s*/.test($exp)) {
		return `const ${$exp.replace(/\*\s*as\s*/, '')} = require(${$uri})`;
	}
}

function parseDefaultExpression(match, $exp, $uri, offset, string) {
	const raw = $exp.replace(/(\{)\s*|\s*(,)\s*|\s*(\})$/g, '$1$2$3');
	const brackeIndex = raw.indexOf(',{');
	const sepIndex = raw.indexOf(',*');
	let rawName;
	let rawExpression;
	if (~brackeIndex) {
		rawName = raw.substr(0, brackeIndex);
		rawExpression = raw.substr(brackeIndex + 1, raw.length);
	} else if (~sepIndex) {
		rawName = raw.substr(0, sepIndex);
		rawExpression = raw.substr(sepIndex + 1, raw.length);
	}
	const defaultData = `const ${rawName} = require(${$uri}).default || require(${$uri})`;
	const expressions = parseExpression(rawExpression, $uri);
	return `${defaultData}\n${expressions}`;
}

function parseImportDeclaration(match, $var, $exp, $uri, offset, string) {
	if (reImportExpressionWithDefault.test($exp)) {
		return parseDefaultExpression(match, $exp, $uri, offset, string);
	} else if (reImportExpressionSep.test($exp)) {
		return parseExpression(match, $exp, $uri, offset, string);
	} else if ($exp === undefined) {
		return `require(${$uri})`;
	}
	return `const ${$exp} = require(${$uri})`;
}

function transformImportDeclarations(source, uri) {
	return source.replace(reImportDeclaration, parseImportDeclaration);
}

function parseDefaultValue(match, $val, $key, $uri) {
	return `module.exports = ${$val || $key}`;
}

function reduceExportExpression(uri, list, item) {
	const chunk = item.replace(reImportExpressionSep, ',').split(',');
	if (chunk.length === 1) {
		list[list.length] = `exports.${chunk[0]} = require(${uri})`;
	} else {
		list[list.length] = `exports.${chunk[1]} = require(${uri}).${chunk[0]}`;
	}
	return list;
}

function reduceExportExpression(uri, list, item){
	const chunk = item.replace(reImportExpressionSep, ',').split(',');
	if (uri) {
		if (chunk.length === 1 && chunk[0] === 'default' === false) {
			list[list.length] = `exports.${chunk[0]} = require(${uri})`;
		} else if (chunk[1] === 'default' === false) {
			list[list.length] = `exports.${chunk[1]} = require(${uri}).${chunk[0]}`;
		}
	} else if (chunk[0] === 'default' === false) {
		list[list.length] = `exports.${chunk[0]} = ${chunk[0]}`;
	}
	return list;
}

function parseExportExpression(m, $raw, $exp, $uri) {
	const reducer = reduceExportExpression.bind(this, $uri);
	const expressions = ($exp ? $exp : $raw).split(',').reduce(reducer, []);
	return expressions.join('\n');
}

function parseExportDeclaration(match, $def, $val, $key, offset, string) {
	if ($def === 'default') {
		return parseDefaultValue(match, $val, $key);
	} else if (/^\{/.test($val)) {
		$val = $val.replace(/\{\s*|\s*(,)\s*|\s*\}/g, '$1');
		return $val.replace(/^(([*0-9a-zA-Z_,\s]+)?\s+from\s+(['"`][0-9a-zA-Z_\s-.\/]+['"`])?|[0-9a-zA-Z_,]+)/gm, parseExportExpression);
	} else if (/^function/.test($val)) {
		return `exports.${$key} = ${match.replace(/^export\s*/, '')}`;
	} else if (/^\*/.test($val)) {
		const ctx = parseExportDeclaration;
		let uid = ctx.uid === undefined ? ctx.uid = 0 : ++ctx.uid;
		const key = `$key${uid}`;
		const val = `$val${uid}`;
		const uri = $val.replace(/\*\s+from\s+(['"`][0-9a-zA-Z_\s-.\/]+['"`])/gm, '$1');
		return `const ${val} = require(${uri})\nfor (const ${key} in ${val}) if (${key} == 'default' === false) exports[${key}] = ${val}[${key}]`;
	}
	return `exports.${$key}`;
}

function transformExportDeclarations(source, uri) {
	return source.replace(reExportDeclaration, parseExportDeclaration);
}

function transform(source, uri) {
	return transformExportDeclarations(transformImportDeclarations(source, uri), uri);
}

module.exports = transform;
