// base file (or dir) node
// not sure what else should we keep here

import MODE from './mode'

export default class Node {
  constructor (path, mode, size, flags, data, atime, ctime, mtime) {
    const now = Date.now()

    this.path = path
    this.mode = mode || MODE.FILE
    this.size = size || 0
    this.flags = flags || {}
    this.atime = atime || now
    this.ctime = ctime || now
    this.mtime = mtime || now
    this.blksize = undefined
    this.nblocks = 1
    this.data = data // blob, arraybuffer, text, you name it
  }
}
