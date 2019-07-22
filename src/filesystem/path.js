// helper class to handle paths

export default class Path {
  constructor (path) {
    if (typeof path === 'string') {
      this.path = path
    } else if (!(path instanceof Path)) {
      throw new Error('It\'s neither Path nor string')
    } else {
      this.path = path.path
    }
  }

  normalize () {
    if (this.path === '\\' || this.path === '/') {
      this.path = '/'
      return this
    }

    this.path = this.path.split(/[/\\]+/).join('/')

    return this
  }

  get basename () {
    const parts = this.path.match(/(\/)?(\w+\.(\S+))/)
    if (parts.size < 2) return undefined
    return parts[2]
  }

  get extension () {
    const parts = this.path.match(/(\/)?(\w+\.(\S+))/)
    if (parts.size < 3) return undefined
    return parts[3]
  }

  get parent () {
    const parts = this.path.split('/')
    parts.pop()
    return new Path(parts.join('/')).normalize()
  }

  get isRoot () {
    return this.path === ''
  }
}
