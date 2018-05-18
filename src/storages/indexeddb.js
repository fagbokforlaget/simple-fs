// I decied to keep it simple, it's just a storage

import Dexie from 'dexie'

export default class Storage {
  constructor (storageName) {
    this.storage = new Dexie(storageName)

    this.storage.version(1).stores({
      files: 'id,path,node,parentId'
    })
  }

  mkdir (id, path, node, parentId) {
    return this.write(id, path, node, parentId)
  }

  rmdir (id) {
    return this.storage.files.delete(id)
  }

  write (id, path, node, parentId) {
    return this.storage.files.put({id: id, path: path, node: node, parentId: parentId})
  }

  exists (path) {
    return this.storage.files.get({path: path})
  }

  read (path, flags) {
    return this.storage.files.get({path: path})
  }

  isEmpty (parentId) {
    return new Promise((resolve, reject) => {
      this.storage.files.where({parentId: parentId})
        .count()
        .then((count) => {
          console.log('count', count)
          resolve(count === 0)
        })
    })
  }
}
