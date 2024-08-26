import os from 'node:os'
import FileSet from 'file-set'
import { strict as a } from 'assert'

const [test, only, skip] = [new Map(), new Map(), new Map()]

if (os.platform() === 'win32') {
  test.set('fileSet.files', async function () {
    const fileSet = new FileSet()
    await fileSet.add([
      'test\\fixture\\*',
      'test\\fixture\\file1',
      'clive',
      'test\\fixture\\folder2\\**'
    ])

    a.deepEqual(fileSet.files, [
      'test\\fixture\\[#f1ipping4nn0y1ing].file.NAME--3[$2$$!].mkv',
      'test\\fixture\\file1',
      'test\\fixture\\folder2\\file3',
      'test\\fixture\\folder2\\folder3\\file4'
    ])
    a.deepEqual(fileSet.dirs, [
      'test\\fixture\\[#f1ipping4nn0y1ing].dir.NAME--3[$2$$!]\\',
      'test\\fixture\\folder2\\',
      'test\\fixture\\folder1\\',
      'test\\fixture\\folder2\\folder3\\'
    ])
    a.deepEqual(fileSet.notExisting, ['clive'])
  })
}

export { test, only, skip }
