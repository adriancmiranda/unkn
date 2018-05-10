#! /usr/bin/env node
const fs = require('fs');
const glob = require('glob');
const colors = require('colors');
const { join, resolve, parse } = require('path');
const { string } = require('./utilities');
const readArgv = require('read-argv');
const transform = require('.');

const argv = readArgv(process.argv);
const reSingleComma = /^[^,]+,[^,]+$/;
const reTrimList = /\s*(,)\s*/g;

const files = argv._.length > 1 ? `{${argv._.join(',')}}` : argv._[0] || '*';
const replaceFile = reSingleComma.test(argv.replace) ? argv.replace.replace(reTrimList, '$1').split(',') : ['', ''];
const match = string(argv.match) ? argv.match : replaceFile[0];
const replaceBy = string(argv.replaceby) ? argv.replaceby : replaceFile[1];
const context = string(argv.dir) ? argv.dir : '';
const outputDir = argv.outputdir;

glob.sync(resolve(join(context, files))).forEach(file => {
	const output = transform(fs.readFileSync(file, 'utf8').toString(), { match, replaceBy });
	let outputPath = parse(file.replace(match, replaceBy));
	outputPath = join(string(outputDir) ? outputDir : outputPath.dir, outputPath.base);
	const writeStream = fs.createWriteStream(outputPath);
	writeStream.write(output, 'utf-8');
	writeStream.on('finish', () => {
		console.info(colors.underline('esx:'), file, colors.green(' -> '), outputPath);
	});
	writeStream.end();
});
