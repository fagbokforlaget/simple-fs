import FileInfo from '../../../src/filesystem/fileinfo'

describe('FileInfo API', () => {
  it('creates instance', () => {
    const info = new FileInfo({ name: 'test', size: 1234, atime: Date.now(), ctime: Date.now(), mtime: Date.now() }, '/somepath')
    expect(typeof info).toBe('object')
  })
})
