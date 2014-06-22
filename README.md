[![view on npm](http://img.shields.io/npm/v/file-set.svg)](https://www.npmjs.org/package/file-set)
[![npm module downloads per month](http://img.shields.io/npm/dm/file-set.svg)](https://www.npmjs.org/package/file-set)
[![Build Status](https://travis-ci.org/75lb/file-set.svg?branch=master)](https://travis-ci.org/75lb/file-set)
[![Dependency Status](https://david-dm.org/75lb/file-set.svg)](https://david-dm.org/75lb/file-set)

<a name="module_file-set"></a>
#file-set(patternList)
Exports a single contructor taking a list of file patterns as input, returning a `file-set` instance containing the expanded patterns split into separate lists of `files`, `dirs` and `notExisting`.


- patternList `string | Array.<string>` - A pattern, or array of patterns to expand

  
####Example
```js
> var fileSet = require("file-set");
{ list:
   [ { path: 'README.md', type: 1 },
     { path: 'jsdoc2md', type: 2 },
     { path: 'lib', type: 2 },
     { path: 'node_modules', type: 2 },
     { path: 'out', type: 2 },
     { path: 'package.json', type: 1 },
     { path: 'test', type: 2 },
     { path: 'tmp', type: 2 },
     { path: 'not/existing/*', type: 0 } ],
  files: [ 'README.md', 'package.json' ],
  dirs:
   [ 'jsdoc2md',
     'lib',
     'node_modules',
     'out',
     'test',
     'tmp' ],
  notExisting: [ 'not/existing/*' ] }
```
**Contents**
* [list](#module_file-set#list)
* [files](#module_file-set#files)
* [dirs](#module_file-set#dirs)
* [notExisting](#module_file-set#notExisting)
* [add(files)](#module_file-set#add)

<a name="module_file-set.NOEXIST"></a>

##class: NOEXIST
<a name="module_file-set.FILE"></a>

##class: FILE
<a name="module_file-set.DIR"></a>

##class: DIR
<a name="module_file-set#list"></a>
###fileSet.list
The full list of unique paths found, and not found.

**Type**: `Array.<string>`  
<a name="module_file-set#files"></a>
###fileSet.files
The existing files found

**Type**: `Array.<string>`  
<a name="module_file-set#dirs"></a>
###fileSet.dirs
The existing directories found

**Type**: `Array.<string>`  
<a name="module_file-set#notExisting"></a>
###fileSet.notExisting
Paths which were not found

**Type**: `Array.<string>`  
<a name="module_file-set#add"></a>
###fileSet.add(files)
add file patterns to the set


- files `string | Array.<string>` - A pattern, or array of patterns to expand

