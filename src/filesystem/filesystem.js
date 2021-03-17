// base FileSystem module, initial version,
// needs refactoring

import Path from './path'
import MODE from './mode'
import Node from './node'
import Stats from './stats'
import FileInfo from './fileinfo'
import IndexedDbStorage from '../storages/indexeddb'

export default class FileSystem {
  constructor (opts = {}) {
    this.storage = opts.storage ||
      new IndexedDbStorage((opts && opts.name) || 'default')
  }

  async mkdir (path) {
    path = new Path(path).normalize()

    const data = await this.exists(path)

    if (data) {
      return data.path
    }

    const parent = await this.exists(path.parent)
    const parentId = parent ? parent.path : 0

    if (!path.parent.isRoot && !parent) {
      throw new Error('parent is not created yet')
    } else if (parent && parent.node.mode !== MODE.DIR) {
      throw new Error('parent is not dir')
    }

    const node = new Node(path.path, MODE.DIR, 0)
    return this.storage.create(path.path, node, parentId)
  }

  // Recursively creates directory, eq. to mkdir -p
  async mkdirParents (path, root = '') {
    path = new Path(path).normalize()
    const mparts = path.path.split('/')
    const mroot = root === '' ? '/' : `${root}/`
    const currentPath = mroot + mparts.shift()

    if (mparts.length === 0) {
      return this.mkdir(currentPath)
    }

    await this.mkdir(currentPath)
    return this.mkdirParents(mparts.join('/'), currentPath)
  }

  async rmdir (path) {
    path = new Path(path).normalize()
    const data = await this.exists(path)
    let isEmpty = false

    if (!data) {
      throw new Error('dir does not exists')
    } else if (data.node.mode === MODE.DIR) {
      isEmpty = await this.storage.isEmpty(data.path)
    } else {
      throw new Error('it is not a dir')
    }

    if (isEmpty) {
      await this.storage.remove(path.path)
    } else {
      throw new Error('dir is not empty')
    }
  }

  async readFile (path, options) {
    path = new Path(path).normalize()
    const data = await this.storage.get(path.path)
    if (!data) {
      throw new Error(`File ${path.path} does not exist`)
    }
    return data.node.data
  }

  async writeFile (path, data, options) {
    path = new Path(path).normalize()

    if (!(data instanceof Blob)) {
      throw new Error('data must be instance of Blob')
    }

    const parent = await this.exists(path.parent)

    if (!parent) {
      throw new Error('file needs parent')
    } else if (parent && parent.node.mode !== MODE.DIR) {
      throw new Error('parent should be dir')
    }

    const parentId = parent.path
    const node = new Node(path.path, MODE.FILE, data.size, options, data)

    return this.storage.put(path.path, node, parentId)
  }

  // Same as writeFile but it recursively creates directory
  // if not exists
  async outputFile (path, data, options) {
    path = new Path(path).normalize()

    if (!(data instanceof Blob)) {
      throw new Error('data must be instance of Blob')
    }

    const parentPath = await this.mkdirParents(path.parent)
    const parent = await this.exists(parentPath)
    if (parent && parent.node.mode !== MODE.DIR) {
      throw new Error('parent should be dir')
    }

    const parentId = parent.path
    const node = new Node(path.path, MODE.FILE, data.size, options, data)

    return this.storage.put(path.path, node, parentId)
  }

  // Dexie specific to insert multiple files in one go
  // Chrome is quite slow with lots of insertion, hence
  // this makes chrome happy
  // https://dev.to/skhmt/why-are-indexeddb-operations-significantly-slower-in-chrome-vs-firefox-1bnd
  async bulkOutputFiles (objs) {
    return this.storage.transaction('rw', async () => {
      for (let i = 0; i < objs.length; i++) {
        const o = objs[i]
        await this.outputFile(o.path, o.blob, o.options || {})
      }
    })
  }

  async rename (oldPath, newPath) {
    throw new Error('not implemented')
  }

  async unlink (path) {
    path = new Path(path).normalize()
    const data = await this.exists(path)

    if (!data) {
      throw new Error('file does not exists')
    } else if (data.node.mode === MODE.DIR) {
      throw new Error('path points to a directory, please use rmdir')
    } else {
      return this.storage.remove(data.path)
    }
  }

  async rmdirRecursive (path) {
    path = new Path(path).normalize()
    const data = await this.exists(path)

    if (!data) return true
    if (data.node.mode !== MODE.DIR) return this.unlink(path)

    const list = await this.ls(path)

    for (const element of list) {
      if (element.node.mode !== MODE.DIR) await this.unlink(element.path)
      else await this.rmdirRecursive(element.path)
    }

    return this.rmdir(path)
  }

  async exists (path) {
    path = new Path(path).normalize()

    return this.storage.get(path.path)
  }

  async stats (path) {
    const data = await this.exists(path)
    if (data) return new Stats(data.node, this.path)
    else throw new Error('path does not exist')
  }

  async ls (path, filters = {}) {
    const filterKeys = Object.keys(filters)
    const data = await this.exists(path)

    if (data) {
      let nodes = await this.storage.where({ parentId: data.path })

      if (filterKeys.length > 0) {
        nodes = nodes.filter((node) => {
          const fileInfo = new FileInfo(node.node, node.path)

          return filterKeys.some((key) => {
            return fileInfo[key] === filters[key]
          })
        })
      }

      return nodes.map(node => new FileInfo(node.node, node.path))
    }

    throw new Error('path does not exist')
  }
}
