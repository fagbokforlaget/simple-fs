import BaseStorage from './base'

export default class MemoryStorage extends BaseStorage {
  constructor (storageName) {
    super(storageName)

    this.name = 'memory'
    this.data = {}
  }

  create (id, path, node, parentId) {
    this.data[id] = {id: id, path: path, node: node, parentId: parentId}
    return new Promise((resolve, reject) => {
      resolve(id)
    })
  }

  remove (id) {
    return new Promise((resolve, reject) => {
      if (id in this.data) {
        delete this.data[id]
      }
      resolve(undefined)
    })
  }

  put (id, path, node, parentId) {
    return this.create(id, path, node, parentId)
  }

  get (path) {
    return new Promise((resolve, reject) => {
      const keys = Object.keys(this.data)

      for (let i = 0; i < keys.length; i++) {
        if (this.data[keys[i]].path === path) {
          resolve(this.data[keys[i]])
        }
      }
      resolve(undefined)
    })
  }

  isEmpty (parentId) {
    return new Promise((resolve, reject) => {
      let count = 0
      const keys = Object.keys(this.data)

      for (let i = 0; i < keys.length; i++) {
        if (this.data[keys[i]].parentId === parentId) {
          count += 1
        }
      }
      resolve(count === 0)
    })
  }
}