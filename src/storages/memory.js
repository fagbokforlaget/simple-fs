import BaseStorage from './base'

export default class MemoryStorage extends BaseStorage {
  constructor (storageName) {
    super(storageName)

    this.name = 'memory'
    this.data = {}
  }

  create (path, node, parentId) {
    this.data[path] = { path: path, node: node, parentId: parentId }
    return new Promise((resolve, reject) => {
      resolve(path)
    })
  }

  remove (path) {
    return new Promise((resolve, reject) => {
      if (path in this.data) {
        delete this.data[path]
      }
      resolve(undefined)
    })
  }

  put (path, node, parentId) {
    return this.create(path, node, parentId)
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

  getBy (key, value) {
    return new Promise((resolve, reject) => {
      const keys = Object.keys(this.data)
      let ret = []

      for (let i = 0; i < keys.length; i++) {
        if (this.data[keys[i]][key] === value) {
          ret.push(this.data[keys[i]])
        }
      }
      resolve(ret)
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
