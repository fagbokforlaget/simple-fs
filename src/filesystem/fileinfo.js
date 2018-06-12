import MODE from './mode'

export default class FileInfo {
  constructor (node, path) {
    this.path = path
    this.assign(node)
  }

  assign (node) {
    Object.keys(node).forEach(key => this[key] = node[key])
  }

  isFile () {
    return (this.mode === MODE.FILE)
  }

  isDirectory () {
    return (this.mode === MODE.DIR)
  }

  isSymbolicLink () {
    return (this.mode === MODE.SYMBOLIC_LINK)
  }

  isSocket () {
    return false
  }

  isFIFO () {
    return false
  }

  isCharacterDevice () {
    return false
  }

  isBlockDevice () {
    return false
  }
}
