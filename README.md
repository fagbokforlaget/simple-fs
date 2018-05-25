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

// first create root folder
let root = await fs.mkdir('/myproject')

// create a file under root folder
let content = new Blob(['This is my cool project'], {type: 'plain/text'})
let data = await fs.writeFile('/myproject/test.txt', content)

// get content as blob
let blob = await fs.readFile('/myproject/test.txt')
```

## Browser support

* Chrome
* IE Edge
* Firefox
* Safari
