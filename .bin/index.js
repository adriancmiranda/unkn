const { env } = require('./config');
const rollup = require('./rollup');

module.exports = ([{
  module: 'unkn',
  source: 'index.next',
  output: 'index',
  format: env.FORMATS,
}, {
  module: 'unkn',
  source: 'cli.next',
  output: 'cli',
  format: env.FORMATS,
}, {
  module: 'unkn',
  source: 'register.next',
  output: 'register',
  format: env.FORMATS,
}]).map(file => rollup(file));
