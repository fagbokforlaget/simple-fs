import Path from '../../../src/filesystem/path'

describe('Path API', () => {
  it('creates an instance when given string', () => {
    const path = new Path('/root/to/object.json')
    expect(typeof path).toBe('object')
  })

  it('creates an instance when given another path', () => {
    const path = new Path('/root/to/object.json')
    const path1 = new Path(path)
    expect(typeof path1).toBe('object')
    expect(path1.path).toEqual(path.path)
  })

  it('throws an error when an argument is not path nor string', () => {
    expect(() => new Path({path: "/root"})).toThrow()
  })

  it('should normalize path', () => {
    const path = new Path('/root//to/object.json').normalize()

    expect(path.path).toEqual('/root/to/object.json')
  })

  it('should return file basename', () => {
    const path = new Path('/root/to/object.json')
    expect(path.basename).toEqual('object.json')
  })

  it('should return file extension', () => {
    const path = new Path('/root/to/object.json')
    expect(path.extension).toEqual('json')
  })

  it('should return parent folder', () => {
    const path = new Path('/root/to/object.json')
    expect(path.parent.path).toEqual('/root/to')
  })

  it('parent should be Path', () => {
    const path = new Path('/root/to/object.json')
    expect(path.parent instanceof Path).toBe(true)
  })
})
