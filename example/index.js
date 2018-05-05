const esx = require('esx');

const source = `
/* eslint-disable no-unused-vars */
import * as internal from './internal/index.js';
import * as has from './has/index.js';
import * as is from './is/index.js';

export * from './internal/index.js';
export { has, is };
export { default as as } from './as/index.js';
export { default as schema } from './schema/index.js';
`;

esx(source);
