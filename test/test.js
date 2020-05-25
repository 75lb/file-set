const Tom = require('test-runner').Tom
const FileSet = require('../')
const a = require('assert').strict

const tom = module.exports = new Tom()

tom.test('fileSet.notExisting', function () {
  const fileSet = new FileSet([ 'test/fixture/*', 'clive', 'test/fixture/folder2/**', 'test/fixture/[#f1ipping4nn0y1ing].dir.NAME--3[$2$$!]' ])

  a.deepEqual(fileSet.notExisting, [ 'clive' ])
})

tom.test('fileSet.files', function () {
  const fileSet = new FileSet([ 'test/fixture/*', 'clive', 'test/fixture/folder2/**' ])

  a.deepEqual(fileSet.files, [
    'test/fixture/[#f1ipping4nn0y1ing].file.NAME--3[$2$$!].mkv',
    'test/fixture/file1',
    'test/fixture/folder2/file3',
    'test/fixture/folder2/folder3/file4'
  ])
})

tom.test('fileSet.dirs', function () {
  const fileSet = new FileSet([ 'test/fixture/*', 'clive', 'test/fixture/folder2/**' ])
  a.deepEqual(fileSet.dirs, [
    'test/fixture/[#f1ipping4nn0y1ing].dir.NAME--3[$2$$!]/',
    'test/fixture/folder1/',
    'test/fixture/folder2/',
    'test/fixture/folder2/folder3/'
  ])
})

tom.test('special chars in filename', function () {
  const fileSet = new FileSet([ 'test/fixture/[#f1ipping4nn0y1ing].file.NAME--3[$2$$!].mkv' ])
  a.deepEqual(fileSet.files, [
    'test/fixture/[#f1ipping4nn0y1ing].file.NAME--3[$2$$!].mkv'
  ])
})

tom.test('fileSet.files: no duplicates', function () {
  const fileSet = new FileSet([ 'test/fixture/folder3/*', 'test/fixture/folder2/*/*' ])

  a.deepEqual(fileSet.files, [
    'test/fixture/folder2/folder3/file4',
  ])
})

tom.test('fileSet.dirs: no duplicates', function () {
  const fileSet = new FileSet([ 'test/fixture/*/*/*', 'test/fixture/folder2/*' ])

  a.deepEqual(fileSet.dirs, [
    'test/fixture/folder2/folder3/',
  ])
})
