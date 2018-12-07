import Stats from '../../../src/filesystem/stats'

describe('Stats API', () => {
  it('creates instance', () => {
    const info = new Stats({ name: 'test', size: 1234, atime: Date.now(), ctime: Date.now(), mtime: Date.now() }, '/somepath')
    expect(typeof info).toBe('object')
  })
})
