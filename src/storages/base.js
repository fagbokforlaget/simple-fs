export default class BaseStorage {
  create (path, node, paraentId) {
    throw new Error('not implemented')
  }

  remove (path) {
    throw new Error('not implemented')
  }

  put (path, node, parentId) {
    throw new Error('not implemented')
  }

  get (path) {
    throw new Error('not implemented')
  }

  where (params) {
    throw new Error('not implemented')
  }

  isEmpty (parentId) {
    throw new Error('not implemented')
  }
}
