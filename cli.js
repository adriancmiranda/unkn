#! /usr/bin/env node
const fs = require('fs');
const glob = require('glob');
const colors = require('colors');
const { join, resolve } = require('path');
const parseArgv = require('./parse-argv');
const spawn = require('./spawn');
const transform = require('.');

const argv = parseArgv(process.argv);
const entry = argv._;
const context = typeof argv.dir === 'string' || argv.dir instanceof String ? argv.dir : '';
const files = entry.length > 1 ? `{${entry.join(',')}}` : entry[0] || '*';

glob.sync(resolve(join(context, files))).forEach(file => {
	const output = transform(fs.readFileSync(file, 'utf8').toString());
	const outputPath = file;
	const writeStream = fs.createWriteStream(outputPath);
	writeStream.write(output, 'utf-8');
	writeStream.on('finish', () => {
		console.info(colors.underline('esx:'), file, colors.green(' -> '), outputPath);
	});
	writeStream.end();
});
