# ESx
> ES6 to Commonjs

## Usage:

One of the ways you can use ESx is through the require hook. The require hook will bind itself to node's require and automatically compile files on the fly.

```javascript
require('esx/register');
```

You can also use the command line:

```bash
esx script.js
```

or node:

```
esx(`
/* eslint-disable no-unused-vars */
import * as internal from './internal/index.js';
import * as has from './has/index.js';
import * as is from './is/index.js';

export * from './internal/index.js';
export { has, is };
export { default as as } from './as/index.js';
export { default as schema } from './schema/index.js';
`)
