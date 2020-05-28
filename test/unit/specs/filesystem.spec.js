import FileSystem from '../../../src/index'
import MemoryStorage from '../../../src/storages/memory'

describe('Filesystem API using IDB', () => {
  let fs

  beforeEach(() => {
    fs = new FileSystem()
  })

  it('creates instance', () => {
    expect(typeof fs).toBe('object')
  })

  it('create directory mkdir', async () => {
    const id = await fs.mkdir('root')

    expect(typeof id).toBe('string')
  })

  it('create nested directory with error', async () => {
    const path = '/root/is/the/king'

    await expect(fs.mkdir(path)).rejects.toEqual(new Error('parent is not created yet'))
  })


})

describe('Filesystem API using memory storage', () => {
  let fs

  beforeEach(() => {
    fs = new FileSystem({storage: new MemoryStorage()})
  })

  it('creates instance', () => {
    expect(typeof fs).toBe('object')
  })

  it('create directory mkdir', async () => {
    let id = await fs.mkdir('root')
    expect(typeof id).toBe('string')
  })

  it('create directory mkdirParents', async () => {
    let path = '/root/is/the/king'
    let id = await fs.mkdirParents(path)
    expect(id).toBe(path)
  })

  it('delete directory rmdir', async () => {
    let id = await fs.mkdir('root')
    expect(typeof id).toBe('string')

    let resp = await fs.rmdir('root')
    expect(resp).toBeUndefined()
  })

  it('delete directory that does not exists', async () => {
    await expect(fs.rmdir('root')).rejects.toEqual(new Error('dir does not exists'))
  })

  it('does not delete file with rmdir', async () => {
    let blob = new Blob(['my test data'], { type: 'plain/text' })
    await fs.outputFile('/root/xx/test.txt', blob)

    await expect(fs.rmdir('/root/xx/test.txt')).rejects.toEqual(new Error('it is not a dir'))
  })

  it('does not delete non-empty dirs', async () => {
    let blob = new Blob(['my test data'], { type: 'plain/text' })
    await fs.outputFile('/root/xx/test.txt', blob)

    await expect(fs.rmdir('/root/xx')).rejects.toEqual(new Error('dir is not empty'))
  })

  it('does bulk insert', async () => {
    let blob = new Blob(['my test data'], { type: 'plain/text' })
    await fs.bulkOutputFiles([
      {path: '/root/xx/test.txt', blob: blob},
      {path: '/root/xy/test.txt', blob: blob},
      {path: '/root/xz/test.txt', blob: blob},
      {path: '/root/xa/test.txt', blob: blob},
      {path: '/root/xb/test.txt', blob: blob},
      {path: '/root/xc/test.txt', blob: blob},
      {path: '/root/xd/test.txt', blob: blob},
      {path: '/root/xe/test.txt', blob: blob},
      {path: '/root/xf/test.txt', blob: blob},
      {path: '/root/xg/test.txt', blob: blob},
    ])

    await expect(fs.rmdir('/root/xx')).rejects.toEqual(new Error('dir is not empty'))
    await expect(fs.rmdir('/root/xy')).rejects.toEqual(new Error('dir is not empty'))
    await expect(fs.rmdir('/root/xz')).rejects.toEqual(new Error('dir is not empty'))
    await expect(fs.rmdir('/root/xa')).rejects.toEqual(new Error('dir is not empty'))
    await expect(fs.rmdir('/root/xb')).rejects.toEqual(new Error('dir is not empty'))
    await expect(fs.rmdir('/root/xc')).rejects.toEqual(new Error('dir is not empty'))
    await expect(fs.rmdir('/root/xd')).rejects.toEqual(new Error('dir is not empty'))
    await expect(fs.rmdir('/root/xe')).rejects.toEqual(new Error('dir is not empty'))
    await expect(fs.rmdir('/root/xf')).rejects.toEqual(new Error('dir is not empty'))
    await expect(fs.rmdir('/root/xg')).rejects.toEqual(new Error('dir is not empty'))
  })

  it('create file', async () => {
    let id = await fs.mkdir('root')
    expect(typeof id).toBe('string')

    let blob = new Blob(['my test data'], { type: 'plain/text' })

    let resp = await fs.writeFile('root/test.txt', blob)
    expect(typeof resp).toBe('string')
  })

  it('create file and creates parent dirs recursively', async () => {
    let blob = new Blob(['my test data'], { type: 'plain/text' })

    let resp = await fs.outputFile('root/to/some/unknown/folder/test.txt', blob)
    expect(typeof resp).toBe('string')
  })

  it('read file', async () => {
    let id = await fs.mkdir('root')
    expect(typeof id).toBe('string')

    let blob = new Blob(['my test data'], { type: 'plain/text' })
    let resp = await fs.writeFile('root/test.txt', blob)
    expect(typeof resp).toBe('string')

    resp = await fs.readFile('root/test.txt')
    expect(typeof resp).toBe('object')
  })

  it('read file which does not exists', async () => {
    let id = await fs.mkdir('root')
    expect(typeof id).toBe('string')

    await expect(fs.readFile('root/test.txt')).rejects.toEqual(new Error('File root/test.txt does not exist'))
  })

  it('write file without root', async () => {
    let blob = new Blob(['my test data'], { type: 'plain/text' })

    await expect(fs.writeFile('root/test.txt', blob)).rejects.toEqual(new Error('file needs parent'))
  })

  it('unlink file', async () => {
    let id = await fs.mkdir('root')
    expect(typeof id).toBe('string')

    let blob = new Blob(['my test data'], { type: 'plain/text' })
    let resp = await fs.writeFile('root/test.txt', blob)
    expect(typeof resp).toBe('string')

    let removed = await fs.unlink('root/test.txt')
    expect(removed).toEqual(undefined)

    await expect(fs.unlink('root/test.txt')).rejects.toEqual(new Error('file does not exists'))
  })

  it('stats file', async () => {
    let id = await fs.mkdir('root')
    expect(typeof id).toBe('string')

    let blob = new Blob(['my test data'], { type: 'plain/text' })
    let resp = await fs.writeFile('root/test.txt', blob)
    expect(typeof resp).toBe('string')

    let stats = await fs.stats('root/test.txt')
    expect(typeof stats).toBe('object')
  })

  it('check if file is a directory', async () => {
    let id = await fs.mkdir('root')
    expect(typeof id).toBe('string')

    let blob = new Blob(['my test data'], { type: 'plain/text' })
    let resp = await fs.writeFile('root/test.txt', blob)
    expect(typeof resp).toBe('string')

    let stats = await fs.stats('root')

    expect(stats.isFile()).toBe(false)
    expect(stats.isSymbolicLink()).toBe(false)
    expect(stats.isDirectory()).toBe(true)
  })

  it('rename file', async () => {
    await expect(fs.rename('root/test.txt', 'root/new.txt')).rejects.toEqual(new Error('not implemented'))
  })

  it('list root files', async () => {
    await fs.mkdir('/root')
    await fs.mkdir('/root/files')
    let blob = new Blob(['my test data'], { type: 'plain/text' })
    await fs.writeFile('/root/test1.txt', blob)
    await fs.writeFile('/root/files/test2.txt', blob)
    await fs.writeFile('/root/files/test3.txt', blob)

    let respRoot = await fs.ls('/root')
    expect(respRoot.length).toBe(2)
  })

  it('list child files', async () => {
    await fs.mkdir('root')
    await fs.mkdir('root/files')
    let blob = new Blob(['my test data'], { type: 'plain/text' })
    await fs.writeFile('root/test1.txt', blob)
    await fs.writeFile('root/files/test2.txt', blob)
    await fs.writeFile('root/files/test3.txt', blob)

    let respChild = await fs.ls('root/files')
    expect(respChild.length).toBe(2)
  })

  it('list child file as FileInfo', async () => {
    await fs.mkdir('root')
    await fs.mkdir('root/files')
    let blob = new Blob(['my test data'], { type: 'plain/text' })
    await fs.writeFile('root/test1.txt', blob)
    await fs.writeFile('root/files/test2.txt', blob)
    await fs.writeFile('root/files/test3.txt', blob)

    let respChild = await fs.ls('root/files')
    expect(respChild[0].mode).toBe('FILE')
    expect(respChild[0].isFile()).toBe(true)
  })

  it('filters output', async () => {
    await fs.mkdir('/root')
    await fs.mkdir('/root/files')
    let blob = new Blob(['my test data'], { type: 'plain/text' })
    await fs.writeFile('/root/test1.txt', blob)
    await fs.writeFile('/root/files/test2.txt', blob)
    await fs.writeFile('/root/files/test3.txt', blob)
    let respRoot = await fs.ls('/root', { 'mode': 'DIR' })
    expect(respRoot.length).toBe(1)
  })

  it('deletes recursively', async () => {
    let blob = new Blob(['my test data'], { type: 'plain/text' })

    let dirs = ['/rootX', '/rootX/files', '/rootX/files/1', '/rootX/anotherFiles']
    let files = ['/rootX/test1.txt', '/rootX/files/test2.txt', '/rootX/files/test3.txt', '/rootX/files/1/test4.txt', '/rootX/anotherFiles/test4.txt']

    for (let el of dirs) {
      await fs.mkdir(el)
    }

    for (let el of files) {
      await fs.writeFile(el, blob)
    }

    await fs.rmdirRecursive('/rootX')

    for (let el of files.concat(dirs)) {
      expect(await fs.exists(el)).not.toBe(true)
    }
  })
})
