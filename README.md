#IndexedDbFS

* Some ideas how this module should run
* nothing's set in stone yet :)
* the api may change significantly, don't use it on production

```javascript
import { FileSystem } from indexeddb-fs

let fs = new FileSystem({backend: 'indexeddb', name: 'storage-name'})

// this should add abc folder
let resp = await fs.mkdir('abc')
```

