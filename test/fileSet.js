'use strict'
var test = require('test-runner')
var FileSet = require('../')
var a = require('core-assert')

test('fileSet.notExisting', function () {
  var fileSet = new FileSet([ 'test/fixture/*', 'clive', 'test/fixture/folder2/**' ])

  a.deepEqual(fileSet.notExisting, [ 'clive' ])
})

test('fileSet.files', function () {
  var fileSet = new FileSet([ 'test/fixture/*', 'clive', 'test/fixture/folder2/**' ])

  a.deepEqual(fileSet.files, [
    'test/fixture/file1',
    'test/fixture/folder2/file3',
    'test/fixture/folder2/folder3/file4'
  ])
})

test('fileSet.dirs', function () {
  var fileSet = new FileSet([ 'test/fixture/*', 'clive', 'test/fixture/folder2/**' ])
  a.deepEqual(fileSet.dirs, [
    'test/fixture/folder1/',
    'test/fixture/folder2/',
    'test/fixture/folder2/folder3/'
  ])
})
