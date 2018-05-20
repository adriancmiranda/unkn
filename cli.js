#! /usr/bin/env node
const fs = require('fs');
const glob = require('glob');
const colors = require('colors');
const readArgv = require('read-argv');
const { join, resolve, parse } = require('path');
const { replace } = require('./options');
const isString = require('./common/isString');
const transform = require('.');

const argv = readArgv(process.argv);
const files = argv._.length > 1 ? `{${argv._.join(',')}}` : argv._[0] || '*';
const options = replace(argv.replace);
const context = isString(argv.dir) ? argv.dir : '';
const outputDir = argv.outputdir;

glob.sync(resolve(join(context, files))).forEach(file => {
	const output = transform(fs.readFileSync(file, 'utf8').toString(), options);
	let outputPath = parse(file.replace(options.pattern, options.replacement));
	outputPath = join(isString(outputDir) ? outputDir : outputPath.dir, outputPath.base);
	if (/test/i.test(process.env.NODE_ENV)) return console.log(output);
	const writeStream = fs.createWriteStream(outputPath);
	writeStream.write(output, 'utf-8');
	writeStream.on('finish', () => {
		console.info(colors.underline('esx:'), file, colors.green(' -> '), outputPath);
	});
	writeStream.end();
});
