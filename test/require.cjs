const os = require('os')
const a = require('assert').strict
const FileSet = require('file-set')

const [test, only, skip] = [new Map(), new Map(), new Map()]

test.set('Check it works correctly from CommonJS', async function () {
  const fileSet = new FileSet()
  await fileSet.add(['test/fixture/*', 'clive', 'test/fixture/folder2/**'])

  a.deepEqual(fileSet.files, [
    'test/fixture/[#f1ipping4nn0y1ing].file.NAME--3[$2$$!].mkv',
    'test/fixture/file1',
    'test/fixture/folder2/file3',
    'test/fixture/folder2/folder3/file4'
  ])
})

module.exports = { test, only, skip }
