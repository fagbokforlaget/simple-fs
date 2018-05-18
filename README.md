#IndexedDbFS

* Some ideas how this module should run
* nothing's set in stone yet :)
* the api may change significantly, don't use it on production

```javascript
let storage = new indexeddbFS.default.storage('testABC')
var fs = new indexeddbFS.default.fs(storage)

// this should add abc folder
fs.mkdir('abc').then((data) => {console.log(data)}).catch((e) => {console.error(e)})

// this should add def folder to abc
fs.mkdir('abc/def').then((data) => {console.log(data)}).catch((e) => {console.error(e)})

// this should throw an exception
fs.mkdir('def/ghi').then((data) => {console.log(data)}).catch((e) => {console.error(e)})

// this should not remove folder, because it's not empty
fs.rmdir('abc').then((data) => {console.log(data)}).catch((e) => {console.error(e)})

// this should remove folder
fs.rmdir('abc/def').then((data) => {console.log(data)}).catch((e) => {console.error(e)})
```

