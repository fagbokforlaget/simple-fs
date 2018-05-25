// base FileSystem module, initial version,
// needs refactoring

import Path from './path'
import MODE from './mode'
import Utils from './utils'
import Node from './node'
import Stats from './stats'
import IndexedDbStorage from '../storages/indexeddb'

export default class FileSystem {
  constructor (opts) {
    this.storage = null

    switch (opts.backend) {
      case 'indexeddb':
        this.storage = new IndexedDbStorage(opts.name)
        break
    }
  }

  mkdir (path) {
    path = new Path(path).normalize()
    return this.exists(path)
      .then((data) => {
        if (data) {
          return data.id
        }

        return this.exists(path.parent)
          .then((parent) => {
            let parentId = parent ? parent.id : 0

            if (!path.parent.isRoot && !parent) {
              throw new Error('parent is not created yet')
            } else if (parent && parent.node.mode !== MODE.DIR) {
              throw new Error('parent is not dir')
            }

            let id = Utils.uuid()
            let node = new Node(id, MODE.DIR, 0)

            return this.storage.mkdir(id, path.path, node, parentId)
          })
      })
  }

  rmdir (path) {
    path = new Path(path).normalize()
    var id

    return this.exists(path)
      .then((data) => {
        if (!data) {
          return true
        } else if (data.node.mode === MODE.DIR) {
          id = data.id
          return this.storage.isEmpty(data.id)
        } else {
          throw new Error('it\'s not a dir')
        }
      })
      .then((isEmpty) => {
        if (isEmpty) {
          if (id) {
            return this.storage.rmdir(id)
          } else {
            return true
          }
        } else {
          throw new Error('dir is not empty')
        }
      })
  }

  open (path, flags) {

  }

  read (filehandle, buffer, offset, length, position) {

  }

  readFile (path, options) {
    path = new Path(path).normalize()

    return new Promise((resolve, reject) => {
      this.storage.read(path.path)
        .then((blob) => {
          // we can read the data here
          // var reader = new FileReader();
          // reader.addEventListener("loadend", function() {
          //    // reader.result contains the contents of blob as a typed array
          // });
          // reader.readAsBinaryString(blob);

          resolve(blob)
        })
        .catch((e) => reject(e))
    })
  }

  write (filehandle, buffer, offset, length, position) {

  }

  writeFile (path, data, options) {
    path = new Path(path).normalize()

    return this.exists(path.parent)
      .then((parent) => {
        if (!parent) {
          throw new Error('file needs parent')
        } else if (parent && parent.mode !== MODE.DIR) {
          throw new Error('parent should be dir')
        }
        return true
      })
      .then(() => {
        return this.exists(path)
      })
      .then((data) => {
        let id = Utils.uuid()
        let node
        let parentId = 0

        if (data) {
          id = data.id
          parentId = data.parentId
        }

        node = new Node(id, MODE.FILE, data.size, options, data)

        return this.storage.write(id, path.path, node, parentId)
      })
  }

  access (path, mode) {

  }

  rename (oldPath, newPath) {

  }

  unlink (path) {

  }

  exists (path) {
    path = new Path(path).normalize()

    return this.storage.exists(path.path)
  }

  stats (path) {
    return this.exists(path)
      .then((data) => {
        return new Promise((resolve, reject) => {
          if (data) {
            resolve(new Stats(data.node, this.path))
          } else {
            reject(new Error('path does not exists'))
          }
        })
      }).catch((err) => { throw err })
  }
}
