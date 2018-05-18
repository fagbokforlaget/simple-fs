// base file (or dir) node
// not sure what else should we keep here

import MODE from './mode'

export default class Node {
  constructor (id, mode, size, flags, data) {
    this.id = id
    this.mode = mode || MODE.FILE
    this.size = size || 0
    this.flags = flags || {}
    this.data = undefined // blob, arraybuffer, text, you name it
  }
}
