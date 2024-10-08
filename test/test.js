import { strict as a } from 'assert'
import FileSet from 'file-set'
import os from 'os'

const [test, only, skip] = [new Map(), new Map(), new Map()]

test.set('fileSet.notExisting', async function () {
  const fileSet = new FileSet()
  await fileSet.add(['test/fixture/*', 'clive', 'test/fixture/folder2/**', 'test/fixture/[#f1ipping4nn0y1ing].dir.NAME--3[$2$$!]'])
  a.deepEqual(fileSet.notExisting, ['clive'])
})

test.set('fileSet.files', async function () {
  const fileSet = new FileSet()
  await fileSet.add(['test/fixture/*', 'clive', 'test/fixture/folder2/**'])

  a.deepEqual(fileSet.files.sort(), [
    'test/fixture/[#f1ipping4nn0y1ing].file.NAME--3[$2$$!].mkv',
    'test/fixture/file1',
    'test/fixture/folder2/file3',
    'test/fixture/folder2/folder3/file4'
  ])
  a.deepEqual(fileSet.dirs.sort(), [
    'test/fixture/[#f1ipping4nn0y1ing].dir.NAME--3[$2$$!]/',
    'test/fixture/folder1/',
    'test/fixture/folder2/',
    'test/fixture/folder2/folder3/'
  ])
  a.deepEqual(fileSet.notExisting, ['clive'])
})

test.set('special chars in filename', async function () {
  const fileSet = new FileSet()
  await fileSet.add(['test/fixture/[#f1ipping4nn0y1ing].file.NAME--3[$2$$!].mkv'])
  a.deepEqual(fileSet.files, [
    'test/fixture/[#f1ipping4nn0y1ing].file.NAME--3[$2$$!].mkv'
  ])
})

test.set('fileSet.files: no duplicates', async function () {
  const fileSet = new FileSet()
  await fileSet.add(['test/fixture/folder3/*', 'test/fixture/folder2/*/*'])

  a.deepEqual(fileSet.files, [
    'test/fixture/folder2/folder3/file4'
  ])
})

test.set('fileSet.dirs: no duplicates', async function () {
  const fileSet = new FileSet()
  await fileSet.add(['test/fixture/*/*/*', 'test/fixture/folder2/*'])
  a.deepEqual(fileSet.dirs, [
    'test/fixture/folder2/folder3/'
  ])
})

test.set('No globs, one missing', async function () {
  const fileSet = new FileSet()
  await fileSet.add(['test/fixture/folder1', 'test/fixture/folder1/file2', 'adasd'])
  a.deepEqual(fileSet.dirs, [
    'test/fixture/folder1/'
  ])
  a.deepEqual(fileSet.files, [
    'test/fixture/folder1/file2'
  ])
  a.deepEqual(fileSet.notExisting, [
    'adasd'
  ])
})

test.set('validation', async function () {
  a.throws(
    () => new FileSet('test/test.mjs'),
    /does not require any arguments/
  )
})


export { test, only, skip }
