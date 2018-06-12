// I decied to keep it simple, it's just a storage

import Dexie from 'dexie'
import BaseStorage from './base'

export default class Storage extends BaseStorage {
  constructor (storageName) {
    super(storageName)

    this.name = 'indexeddb'
    this.storage = new Dexie(storageName)

    this.storage.version(1).stores({
      files: 'path,node,parentId'
    })
  }

  create (path, node, parentId) {
    return this.put(path, node, parentId)
  }

  remove (path) {
    return this.storage.files.delete({path: path})
  }

  put (path, node, parentId) {
    return this.storage.files.put({path: path, node: node, parentId: parentId})
  }

  get (path) {
    return this.storage.files.get({path: path})
  }

  getBy (key, value) {
    let params = {}
    params[key] = value

    return this.storage.files.get(params)
  }

  isEmpty (parentId) {
    return new Promise((resolve, reject) => {
      this.storage.files.where({parentId: parentId})
        .count()
        .then((count) => {
          resolve(count === 0)
        })
    })
  }
}
