# SimpleFS
[![view on npm](https://img.shields.io/npm/v/@forlagshuset/simple-fs.svg)](https://www.npmjs.com/package/@forlagshuset/simple-fs)
[![npm module downloads](http://img.shields.io/npm/dt/@forlagshuset/simple-fs.svg)](https://www.npmjs.org/package/@forlagshuset/simple-fs)
[![Dependency Status](https://david-dm.org/fagbokforlaget/simple-fs.svg)](https://david-dm.org/fagbokforlaget/simple-fs)
[![Known Vulnerabilities](https://snyk.io/test/github/fagbokforlaget/simple-fs/badge.svg?targetFile=package.json)](https://snyk.io/test/github/fagbokforlaget/simple-fs?targetFile=package.json)
[![Build Status](https://travis-ci.org/fagbokforlaget/simple-fs.svg?branch=master)](https://travis-ci.org/fagbokforlaget/simple-fs)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

A minimal, extensible and promise based filesystem layer for modern browsers.

## Supported backeneds

* IndexedDB (default)
* Memory (experimental and used for testing)

## Installation

npm:
```
npm install --save @forlagshuset/simple-fs
```
browser:
```html
<script src='https://unpkg.com/@forlagshuset/simple-fs@latest/dist/SimpleFS.min.js' async></script>
```

## Usage
```javascript
import FileSystem from '@forlagshuset/simple-fs'

let fs = new FileSystem({name: 'storage-name'})

// first create root folder
let root = await fs.mkdir('/myproject')

// create a file under root folder
let content = new Blob(['This is my cool project'], {type: 'plain/text'})
let data = await fs.writeFile('/myproject/test.txt', content)

// get content as blob
let blob = await fs.readFile('/myproject/test.txt')
```

## API

```javascript
mkdir(<path>)
mkdirParents(<path>) // wraps mkdir -p
rmdir(<path>)
rmdirRecursive(<path>) // removes dirs recursively
readFile(<path>, <options>={}) // returns Blob
writeFile(<path>, <data>, <options>={}) // data should be Blob type
outputFile(<path>, <data>, <options>={}) // Wraps writeFile and recursively creates path if not exists
unlink(<path>)
exists(<path>)
stats(<path>)
```

## Browser support

* Chrome
* IE Edge
* Firefox
* Safari
