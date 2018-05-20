const words = require('./words');
const capitalizeWord = require('./capitalizeWord');

module.exports = (value, pattern) => (
	words(`${value}`.replace(/['\u2019]/g, ''), pattern).reduce((result, word, index) => {
		word = word.toLowerCase();
		return result + capitalizeWord(word);
	}, '')
);
