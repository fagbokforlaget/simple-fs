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

  it('write file without root', async () => {
    let fs = new FileSystem({backend: 'memory', name: 'test'})
    let blob = new Blob(['my test data'], {type: 'plain/text'})

    await expect(fs.writeFile('root/test.txt', blob)).rejects.toEqual(new Error('file needs parent'))
  })

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

  it('rename file', async () => {
    let fs = new FileSystem({backend: 'memory', name: 'test'})

    await expect(fs.rename('root/test.txt', 'root/new.txt')).rejects.toEqual(new Error('not implemented'))
  })





})
