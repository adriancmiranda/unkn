const words = require('./words');
const capitalizeWord = require('./capitalizeWord');

module.exports = (string, pattern) => (
	words(`${string}`.replace(/['\u2019]/g, ''), pattern).reduce((result, word, index) => {
		word = word.toLowerCase();
		return result + (index ? capitalizeWord(word) : word);
	}, '');
);
