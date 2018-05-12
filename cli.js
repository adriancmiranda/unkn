#! /usr/bin/env node
const fs = require('fs');
const glob = require('glob');
const colors = require('colors');
const readArgv = require('read-argv');
const { join, resolve, parse } = require('path');
const isString = require('./common/isString');
const transform = require('.');

const argv = readArgv(process.argv);
const reSingleComma = /^[^,]+,[^,]+$/;
const reTrimList = /\s*(,)\s*/g;

const files = argv._.length > 1 ? `{${argv._.join(',')}}` : argv._[0] || '*';
const replaceFile = reSingleComma.test(argv.replace) ? argv.replace.replace(reTrimList, '$1').split(',') : ['', ''];
const match = isString(argv.match) ? argv.match : replaceFile[0];
const flags = argv.flags;
const escapeRegExp = argv.escape;
const replaceBy = isString(argv.replaceby) ? argv.replaceby : replaceFile[1];
const context = isString(argv.dir) ? argv.dir : '';
const outputDir = argv.outputdir;

glob.sync(resolve(join(context, files))).forEach(file => {
	const options = { match, flags, escapeRegExp, replaceBy };
	const output = transform(fs.readFileSync(file, 'utf8').toString(), options);
	let outputPath = parse(file.replace(match, replaceBy));
	outputPath = join(isString(outputDir) ? outputDir : outputPath.dir, outputPath.base);
	if (/test/i.test(process.env.NODE_ENV)) return console.log(output);
	const writeStream = fs.createWriteStream(outputPath);
	writeStream.write(output, 'utf-8');
	writeStream.on('finish', () => {
		console.info(colors.underline('esx:'), file, colors.green(' -> '), outputPath);
	});
	writeStream.end();
});
