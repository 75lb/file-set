[![view on npm](http://img.shields.io/npm/v/file-set.svg)](https://www.npmjs.org/package/file-set)
[![npm module downloads per month](http://img.shields.io/npm/dm/file-set.svg)](https://www.npmjs.org/package/file-set)
[![Build Status](https://travis-ci.org/75lb/file-set.svg?branch=master)](https://travis-ci.org/75lb/file-set)
[![Dependency Status](https://david-dm.org/75lb/file-set.svg)](https://david-dm.org/75lb/file-set)

<a name="module_file-set"></a>
#file-set
Exports a single function which expands file patterns, returning an object containing the input files split into separate lists.


- files `Array.<string>` - The input file patterns to expand

  
**Returns**: `object`  
####Example
```js
var fileSet = require("file-set");

var thoseFiles = fileSet([ "these/*.js", "those/*.txt" ]);
```
**Contents**
* [Class: FileSet](#module_file-set.FileSet)

<a name="module_file-set.FileSet"></a>

##class: FileSet
**Scope**: inner class of [file-set](#module_file-set)  
<a name="module_file-set.FileSet.NOEXIST"></a>
###fileSet.NOEXIST
**Default**: `0`  
**Type**: `number`  
<a name="module_file-set.FileSet.FILE"></a>
###fileSet.FILE
**Default**: `1`  
**Type**: `number`  
<a name="module_file-set.FileSet.DIR"></a>
###fileSet.DIR
**Default**: `2`  
**Type**: `number`  
<a name="module_file-set.FileSet#list"></a>
###fileSet.list
A list of unique paths, all which exist

**Type**: `Array.<string>`  
<a name="module_file-set.FileSet#files"></a>
###fileSet.files
List of files which exist

**Type**: `Array.<string>`  
<a name="module_file-set.FileSet#dirs"></a>
###fileSet.dirs
List of dirs which exist

**Type**: `Array.<string>`  
<a name="module_file-set.FileSet#notExisting"></a>
###fileSet.notExisting
Paths which do not exist

**Type**: `Array.<string>`  
<a name="module_file-set.FileSet#add"></a>
###fileSet.add(files)
add files to the set


- files `string | Array.<string>` - the files to add

