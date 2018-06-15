import FileSystem from '../../../src/index'

describe('Filesystem API', () => {
  it('creates instance', () => {
    let fs = new FileSystem({name: 'test'})
    expect(typeof fs).toBe('object')
  })

  it('create directory mkdir', async () => {
    let fs = new FileSystem({backend: 'memory', name: 'test'})

    let id = await fs.mkdir('root')
    expect(typeof id).toBe('string')
  })

  it('create directory mkdirParents', async () => {
    let fs = new FileSystem({backend: 'memory', name: 'test'})
    let path = "root/is/the/king"
    let id = await fs.mkdirParents(path)
    expect(id).toBe(path)
  })

  it('delete directory rmdir', async () => {
    let fs = new FileSystem({backend: 'memory', name: 'test'})

    let id = await fs.mkdir('root')
    expect(typeof id).toBe('string')

    let resp = await fs.rmdir('root')
    expect(resp).toBeUndefined()
  })

  it('delete directory that does not exists', async () => {
    let fs = new FileSystem({backend: 'memory', name: 'test'})

    await expect(fs.rmdir('root')).rejects.toEqual(new Error('dir does not exists'))
  })

  it('create file', async () => {
    let fs = new FileSystem({backend: 'memory', name: 'test'})

    let id = await fs.mkdir('root')
    expect(typeof id).toBe('string')

    let blob = new Blob(['my test data'], {type: 'plain/text'})

    let resp = await fs.writeFile('root/test.txt', blob)
    expect(typeof resp).toBe('string')
  })

  it('create file and creates parent dirs recursively', async () => {
    let fs = new FileSystem({backend: 'memory', name: 'test'})

    let blob = new Blob(['my test data'], {type: 'plain/text'})

    let resp = await fs.outputFile('root/to/some/unknown/folder/test.txt', blob)
    expect(typeof resp).toBe('string')
  })

  it('read file', async () => {
    let fs = new FileSystem({backend: 'memory', name: 'test'})

    let id = await fs.mkdir('root')
    expect(typeof id).toBe('string')

    let blob = new Blob(['my test data'], {type: 'plain/text'})
    let resp = await fs.writeFile('root/test.txt', blob)
    expect(typeof resp).toBe('string')

    let file = await fs.readFile('root/test.txt')
    expect(typeof resp).toBe('string')
  })

  it('read file which does not exists', async () => {
    let fs = new FileSystem({backend: 'memory', name: 'test'})

    let id = await fs.mkdir('root')
    expect(typeof id).toBe('string')

    await expect(fs.readFile('root/test.txt')).rejects.toEqual(new Error('file does not exists'))
  })

  // it('write file without root', async () => {
  //   let fs = new FileSystem({backend: 'memory', name: 'test'})
  //   let blob = new Blob(['my test data'], {type: 'plain/text'})

  //   await expect(fs.writeFile('root/test.txt', blob)).rejects.toEqual(new Error('file needs parent'))
  // })

  it('unlink file', async () => {
    let fs = new FileSystem({backend: 'memory', name: 'test'})

    let id = await fs.mkdir('root')
    expect(typeof id).toBe('string')

    let blob = new Blob(['my test data'], {type: 'plain/text'})
    let resp = await fs.writeFile('root/test.txt', blob)
    expect(typeof resp).toBe('string')

    let removed = await fs.unlink('root/test.txt')
    expect(removed).toEqual(undefined)

    await expect(fs.unlink('root/test.txt')).rejects.toEqual(new Error('file does not exists'))
  })

  it('stats file', async () => {
    let fs = new FileSystem({backend: 'memory', name: 'test'})

    let id = await fs.mkdir('root')
    expect(typeof id).toBe('string')

    let blob = new Blob(['my test data'], {type: 'plain/text'})
    let resp = await fs.writeFile('root/test.txt', blob)
    expect(typeof resp).toBe('string')

    let stats = await fs.stats('root/test.txt')
    expect(typeof stats).toBe('object')
  })

  it('check if file is a directory', async () => {
    let fs = new FileSystem({backend: 'memory', name: 'test'})

    let id = await fs.mkdir('root')
    expect(typeof id).toBe('string')

    let blob = new Blob(['my test data'], {type: 'plain/text'})
    let resp = await fs.writeFile('root/test.txt', blob)
    expect(typeof resp).toBe('string')

    let stats = await fs.stats('root')

    expect(stats.isFile()).toBe(false)
    expect(stats.isSymbolicLink()).toBe(false)
    expect(stats.isDirectory()).toBe(true)
  })

  it('rename file', async () => {
    let fs = new FileSystem({backend: 'memory', name: 'test'})

    await expect(fs.rename('root/test.txt', 'root/new.txt')).rejects.toEqual(new Error('not implemented'))
  })

  it('list root files', async() => {
    let fs = new FileSystem({backend: 'memory', name: 'test'})
    let root_dir = await fs.mkdir('root')
    let child_dir = await fs.mkdir('root/files')
    let blob = new Blob(['my test data'], {type: 'plain/text'})
    let root_dir_file = await fs.writeFile('root/test1.txt', blob)
    let child_dir_file1 = await fs.writeFile('root/files/test2.txt', blob)
    let child_dir_file2 = await fs.writeFile('root/files/test3.txt', blob)

    let resp_root = await fs.ls('root')
    expect(resp_root.length).toBe(2) //root/files, root/test1.txt
  })

  it('list child files', async() => {
    let fs = new FileSystem({backend: 'memory', name: 'test'})
    let root_dir = await fs.mkdir('root')
    let child_dir = await fs.mkdir('root/files')
    let blob = new Blob(['my test data'], {type: 'plain/text'})
    let root_dir_file = await fs.writeFile('root/test1.txt', blob)
    let child_dir_file1 = await fs.writeFile('root/files/test2.txt', blob)
    let child_dir_file2 = await fs.writeFile('root/files/test3.txt', blob)

    let resp_child = await fs.ls('root/files')
    expect(resp_child.length).toBe(2)
  })

  it('list child file as FileInfo', async() => {
    let fs = new FileSystem({backend: 'memory', name: 'test'})
    let root_dir = await fs.mkdir('root')
    let child_dir = await fs.mkdir('root/files')
    let blob = new Blob(['my test data'], {type: 'plain/text'})
    let root_dir_file = await fs.writeFile('root/test1.txt', blob)
    let child_dir_file1 = await fs.writeFile('root/files/test2.txt', blob)
    let child_dir_file2 = await fs.writeFile('root/files/test3.txt', blob)

    let resp_child = await fs.ls('root/files')
    expect(resp_child[0].mode).toBe('FILE')
    expect(resp_child[0].isFile()).toBe(true)
  })

  it('filters output', async() => {
    let fs = new FileSystem({backend: 'memory', name: 'test'})
    let root_dir = await fs.mkdir('root')
    let child_dir = await fs.mkdir('root/files')
    let blob = new Blob(['my test data'], {type: 'plain/text'})
    let root_dir_file = await fs.writeFile('root/test1.txt', blob)
    let child_dir_file1 = await fs.writeFile('root/files/test2.txt', blob)
    let child_dir_file2 = await fs.writeFile('root/files/test3.txt', blob)
    let resp_root = await fs.ls('root', {'mode': 'DIR'})
    expect(resp_root.length).toBe(1) //root/files, root/test1.txt
  })

})
