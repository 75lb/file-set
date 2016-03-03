'use strict'
var test = require('tape')
var FileSet = require('../')

test('fileSet.notExisting', function (t) {
  var fileSet = new FileSet([ 'test/fixture/*', 'clive', 'test/fixture/folder2/**' ])

  t.deepEqual(fileSet.notExisting, [ 'clive' ])
  t.end()
})

test('fileSet.files', function (t) {
  var fileSet = new FileSet([ 'test/fixture/*', 'clive', 'test/fixture/folder2/**' ])

  t.deepEqual(fileSet.files, [
    'test/fixture/file1',
    'test/fixture/folder2/file3',
    'test/fixture/folder2/folder3/file4'
  ])
  t.end()
})

test('fileSet.dirs', function (t) {
  var fileSet = new FileSet([ 'test/fixture/*', 'clive', 'test/fixture/folder2/**' ])
  t.deepEqual(fileSet.dirs, [
    'test/fixture/folder1/',
    'test/fixture/folder2/',
    'test/fixture/folder2/folder3/'
  ])
  t.end()
})
