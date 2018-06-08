import MODE from './mode'

export default class Stats {
  constructor (node, devName) {
    this.node = node
    this.dev = devName
    this.size = node.size
    this.atime = node.atime
    this.ctime = node.ctime
    this.mtime = node.mtime
    this.type = node.mode
  }

  isFile () {
    return (this.type === MODE.FILE)
  }

  isDirectory () {
    return (this.type === MODE.DIR)
  }

  isSymbolicLink () {
    return (this.type === MODE.SYMBOLIC_LINK)
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
