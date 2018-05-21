// base file (or dir) node
// not sure what else should we keep here

import MODE from './mode'

export default class Node {
  constructor (id, mode, size, flags, data, atime, ctime, mtime) {
    const now = Date.now()

    this.id = id
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
