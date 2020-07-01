// I decied to keep it simple, it's just a storage

import Dexie from 'dexie'
import BaseStorage from './base'

export default class Storage extends BaseStorage {
  constructor (storageName = 'default') {
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

  async remove (path) {
    await this.storage.files.where({ path: path }).delete()
  }

  put (path, node, parentId) {
    return this.storage.files.put({ path: path, node: node, parentId: parentId })
  }

  transaction (mode, cb) {
    return this.storage.transaction(mode, this.storage.files, cb)
  }

  get (path) {
    return this.storage.files.get({ path: path })
  }

  getBy (key, value) {
    const params = {}
    params[key] = value

    return this.storage.files.where(params).toArray()
  }

  where (params) {
    return this.storage.files.where(params).toArray()
  }

  async isEmpty (parentId) {
    const count = await this.storage.files.where({ parentId: parentId }).count()
    return count === 0
  }
}
