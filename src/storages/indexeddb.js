// I decied to keep it simple, it's just a storage

import Dexie from 'dexie'
import BaseStorage from './base'

export default class Storage extends BaseStorage {
  constructor (storageName) {
    super(storageName)

    this.name = 'indexeddb'
    this.storage = new Dexie(storageName)

    this.storage.version(1).stores({
      files: 'id,path,node,parentId'
    })
  }

  create (id, path, node, parentId) {
    return this.put(id, path, node, parentId)
  }

  remove (id) {
    return this.storage.files.delete(id)
  }

  put (id, path, node, parentId) {
    return this.storage.files.put({id: id, path: path, node: node, parentId: parentId})
  }

  get (path) {
    return this.storage.files.get({path: path})
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
