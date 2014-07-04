[![view on npm](http://img.shields.io/npm/v/file-set.svg)](https://www.npmjs.org/package/file-set)
[![npm module downloads per month](http://img.shields.io/npm/dm/file-set.svg)](https://www.npmjs.org/package/file-set)
[![Build Status](https://travis-ci.org/75lb/file-set.svg?branch=master)](https://travis-ci.org/75lb/file-set)
[![Dependency Status](https://david-dm.org/75lb/file-set.svg)](https://david-dm.org/75lb/file-set)

#file-set
Exports a contructor taking a list of file patterns as input, returning a `file-set` instance containing the expanded patterns split into separate lists of `files`, `dirs` and `notExisting`.

##Install
```sh
$ npm install file-set --save
```

##Usage
```js
> var fileSet = require("file-set");
> var ls = fileSet([ "*", "not/existing/*" ])
{ list:
   [ { path: 'README.md', type: 1 },
     { path: 'jsdoc2md', type: 2 },
     { path: 'lib', type: 2 },
     { path: 'node_modules', type: 2 },
     { path: 'package.json', type: 1 },
     { path: 'test', type: 2 },
     { path: 'not/existing/*', type: 0 } ],
  files: [ 'README.md', 'package.json' ],
  dirs:
   [ 'jsdoc2md',
     'lib',
     'node_modules',
     'test' ],
  notExisting: [ 'not/existing/*' ] }
```

<a name="module_file-set"></a>
##file-set
**Example**  
```js
var fileSet = require("file-set");
```

**Symbols**

* [file-set.list](#module_file-set#list)
* [file-set.files](#module_file-set#files)
* [file-set.dirs](#module_file-set#dirs)
* [file-set.notExisting](#module_file-set#notExisting)
* [file-set.add(files)](#module_file-set#add)
* [enum: file-set.eFileType](#module_file-set.eFileType)

<a name="module_file-set"></a>
##new module:file-set(patternList)
Expands a list of file patterns

**Params**

- patternList `string` | `Array.<string>` - A pattern, or array of patterns to expand

<a name="module_file-set#list"></a>
###file-set.list
The full list of unique paths found, and not found.

**Type**: `Array.<string>`  
<a name="module_file-set#files"></a>
###file-set.files
The existing files found

**Type**: `Array.<string>`  
<a name="module_file-set#dirs"></a>
###file-set.dirs
The existing directories found

**Type**: `Array.<string>`  
<a name="module_file-set#notExisting"></a>
###file-set.notExisting
Paths which were not found

**Type**: `Array.<string>`  
<a name="module_file-set#add"></a>
###file-set.add(files)
add file patterns to the set

**Params**

- files `string` | `Array.<string>` - A pattern, or array of patterns to expand

<a name="module_file-set.eFileType"></a>
###enum: file-set.eFileType
Enum for the `type` value of each record in `fileSet.list`

**Type**: `number`  
**Properties**: `NOEXIST`, `FILE`, `DIR`  
**Read only**: true  

