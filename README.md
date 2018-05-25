# SimpleFS
NOTE: api may change significantly, don't use it on production

A minimal, extensible and promise based filesystem layer for modern browsers.

## Supported backeneds

* IndexedDB (default)

## API

```
mkdir(<path>)
rmdir(<path>)
readFile(<path>, <options>={}) // returns Blob
writeFile(<path>, <data>, <options>={}) // data should be Blob type
unlink(<path>)
exists(<path>)
stats(<path>)
```


## Usage
```javascript
import { FileSystem } from '@forlagshuset/simple-fs'

let fs = new FileSystem({name: 'storage-name'})

// this should add abc folder
let resp = await fs.mkdir('abc')
```

## Browser support

* Chrome
* IE Edge
* Firefox
* Safari
