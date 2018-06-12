import Stats from './stats'

export default class FileInfo extends Stats {
  constructor (node, path) {
    super(node, path)
    this.path = path
    this.assign(node)
  }

  assign (node) {
    Object.keys(node).forEach(key => {
      this[key] = node[key]
    })
  }
}
