# SimpleFS
[![view on npm](https://img.shields.io/npm/v/@forlagshuset/simple-fs.svg)](https://www.npmjs.com/package/@forlagshuset/simple-fs)
[![npm module downloads](http://img.shields.io/npm/dt/@forlagshuset/simple-fs.svg)](https://www.npmjs.org/package/@forlagshuset/simple-fs)
[![Dependency Status](https://david-dm.org/fagbokforlaget/simple-fs.svg)](https://david-dm.org/fagbokforlaget/simple-fs)
[![Known Vulnerabilities](https://snyk.io/test/github/fagbokforlaget/simple-fs/badge.svg?targetFile=package.json)](https://snyk.io/test/github/fagbokforlaget/simple-fs?targetFile=package.json)
[![Build Status](https://travis-ci.org/fagbokforlaget/simple-fs.svg?branch=master)](https://travis-ci.org/fagbokforlaget/simple-fs)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

A minimal, extensible and promise based filesystem layer for modern browsers.

[Live Demo](https://codepen.io/iapain/full/MxLNeg)

## Supported storage backend
Simple-fs provides two storage backend. It's possible to write your own stoage backend using [Storage API](https://github.com/fagbokforlaget/simple-fs/blob/master/src/storages/base.js)

* IndexedDB (default)
```
import { IndexedDbStorage } from '@forlagshuset/simple-fs'
```
* Memory (experimental and used for testing)
```
import { MemoryStorage } from '@forlagshuset/simple-fs'
```

## Installation

npm:
```
npm install --save @forlagshuset/simple-fs
```

## Usage
browser (umd):
```html
<script src='https://unpkg.com/@forlagshuset/simple-fs@latest/dist/SimpleFS.js' async></script>
<script>
  // by default SimpleFS uses IndexedDB
  const fs = new SimpleFS.FileSystem()
  // do stuff

  await fs.mkdir('/myproject')

  // create a file under root folder
  const content = new Blob(['This is my cool project'], {type: 'plain/text'})
  await fs.writeFile('/myproject/test.txt', content)

  // get content as blob
  let blob = await fs.readFile('/myproject/test.txt')

</script>
```


browser (modules)
```javascript
import SimpleFS from '@forlagshuset/simple-fs'
// OR es6 modules from unpkg
import SimpleFS from "//unpkg.com/@forlagshuset/simple-fs?module"

const fs = new SimpleFS.FileSystem()

// first create root folder
await fs.mkdir('/myproject')

// create a file under root folder
const content = new Blob(['This is my cool project'], {type: 'plain/text'})
await fs.writeFile('/myproject/test.txt', content)

// get content as blob
let blob = await fs.readFile('/myproject/test.txt')
```

## API

FileSystem
```javascript
constructor({storage: storageObj = new IndexedDbStorage('my-storage-name')})
mkdir(path: string)
mkdirParents(path: string) // wraps mkdir -p
rmdir(path: string)
rmdirRecursive(path: string) // removes dirs recursively
readFile(path: string, options={}) // returns Blob
writeFile(path: string, data: Blob, options={}) // data should be Blob type
outputFile(path: string, data: Blob, options={}) // Wraps writeFile and recursively creates path if not exists
bulkOutputFiles([{path: string, blob: Blob, options:{}]) // Output files in one transaction, speeds up in chrome
unlink(path: string)
exists(path: string)
stats(path: string)
```

## Browser support

* Chrome
* IE Edge
* Firefox
* Safari
