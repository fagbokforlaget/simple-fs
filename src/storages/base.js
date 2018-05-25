export default class BaseStorage {
  create (id, path, node, paraentId) {
    throw new Error('not implemented')
  }

  remove (id) {
    throw new Error('not implemented')
  }

  put (id, path, node, parentId) {
    throw new Error('not implemented')
  }

  get (path) {
    throw new Error('not implemented')
  }

  isEmpty (parentId) {
    throw new Error('not implemented')
  }
}
