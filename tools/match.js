const { match, rules } = require('rx4d');

const hsep = match.whiteSpace.oneOrMoreTimes();
const hgutter = match.whiteSpace.zeroOrMoreTimes();
const inlineComment = match.quote('/').atLeast(2).value(hgutter)();
const blockComment = match.quote('/').ifFollowedBy('\\*').oneOrMoreTimes.value(hgutter)();
const commentStyles = match.value(inlineComment).or.value(blockComment)();
const ifNotFollowedByComment = match.ifNotFollowedBy(commentStyles)();

module.exports = rules({
	hsep,
	hgutter,
	inlineComment,
	blockComment,
	commentStyles,
	ifNotFollowedByComment,
	allBetween: (self, last, tags, input) => match
	.group(match.charset(tags))
	.startCapture
	.ifNotFollowedBy('\\1').or.value(input)
	.endCapture
	.zeroOrMoreTimes
	.zeroOrOneTime
	.value('\\1')(),
});
