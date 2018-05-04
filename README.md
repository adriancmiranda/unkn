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
