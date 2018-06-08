// base FileSystem module, initial version,
// needs refactoring

import Path from './path'
import MODE from './mode'
import Utils from './utils'
import Node from './node'
import Stats from './stats'
import IndexedDbStorage from '../storages/indexeddb'
import MemoryStorage from '../storages/memory'

export default class FileSystem {
  constructor (opts) {
    opts.backend = opts.backend || 'indexeddb'
    this.storage = null

    switch (opts.backend) {
      case 'indexeddb':
        this.storage = new IndexedDbStorage(opts.name)
        break
      case 'memory':
        this.storage = new MemoryStorage(opts.name)
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

            return this.storage.create(id, path.path, node, parentId)
          })
      })
  }

  rmdir (path) {
    let id

    path = new Path(path).normalize()
    return this.exists(path)
      .then((data) => {
        if (!data) {
          throw new Error('dir does not exists')
        } else if (data.node.mode === MODE.DIR) {
          id = data.id
          return this.storage.isEmpty(data.id)
        } else {
          throw new Error('it is not a dir')
        }
      })
      .then((isEmpty) => {
        if (isEmpty) {
          if (id) {
            return this.storage.remove(id)
          } else {
            throw new Error('internal error: file id is missing')
          }
        } else {
          throw new Error('dir is not empty')
        }
      })
  }

  readFile (path, options) {
    path = new Path(path).normalize()

    return new Promise((resolve, reject) => {
      this.storage.get(path.path)
        .then((data) => {
          if (!data) {
            throw new Error('file does not exists')
          }
          resolve(data.node.data)
        })
        .catch((e) => reject(e))
    })
  }

  writeFile (path, data, options) {
    path = new Path(path).normalize()

    if (!(data instanceof Blob)) {
      throw new Error('data must be instance of Blob')
    }

    return this.exists(path.parent)
      .then((parent) => {
        if (!parent) {
          throw new Error('file needs parent')
        } else if (parent && parent.node.mode !== MODE.DIR) {
          throw new Error('parent should be dir')
        }

        const id = Utils.uuid()
        const parentId = parent.id
        const node = new Node(id, MODE.FILE, data.size, options, data)

        return this.storage.put(id, path.path, node, parentId)
      })
  }

  rename (oldPath, newPath) {
    return new Promise((resolve, reject) => {
      throw Error('not implemented')
    })
  }

  unlink (path) {
    path = new Path(path).normalize()

    return this.exists(path)
      .then((data) => {
        if (!data) {
          throw new Error('file does not exists')
        } else if (data.node.mode === MODE.DIR) {
          throw new Error('path points to a directory, please use rmdir')
        } else {
          return this.storage.remove(data.id)
        }
      })
  }

  exists (path) {
    path = new Path(path).normalize()

    return this.storage.get(path.path)
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

  ls (path, options = {}) {
    return this.exists(path)
      .then((data) => {
        if (data) {
          return this.storage.getBy("parentId", data.id)
        } else {
          return new Error('path does not exists')
        }
      })
  }
}
