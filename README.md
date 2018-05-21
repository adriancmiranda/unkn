# ESx
> ES6 to Commonjs

[![stability]][stability-url]

## Usage:

One of the ways you can use ESx is through the require hook. The require hook will bind itself to node's require and automatically compile files on the fly.

```javascript
require('esx/register')();
```

You can also use the command line:

```bash
esx script.next.js --replace='/.next(.js)?/i,$1'
```

or node:

```javascript
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
```

[stability]: http://badges.github.io/stability-badges/dist/experimental.svg
[stability-url]: http://learnhtmlwithsong.com/blog/wp-content/uploads/2014/12/errors-everywhere-meme.png

<!-- helpful links -->
[Bayfront Technologies - mc tutorial]: http://www.bayfronttechnologies.com/mc_tutorial.html
