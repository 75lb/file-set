[![view on npm](http://img.shields.io/npm/v/file-set.svg)](https://www.npmjs.org/package/file-set)
[![npm module downloads per month](http://img.shields.io/npm/dm/file-set.svg)](https://www.npmjs.org/package/file-set)
[![Build Status](https://travis-ci.org/75lb/file-set.svg?branch=master)](https://travis-ci.org/75lb/file-set)
[![Dependency Status](https://david-dm.org/75lb/file-set.svg)](https://david-dm.org/75lb/file-set)

<a name="module_file-set"></a>
#file-set(files)
Exports a single function which expands file patterns, returning an object containing the input files split into separate lists.


- files `Array.<string>` - The input file patterns to expand

  
**Returns**: `object`  
####Example
```js
var thoseFiles = fileSet([ "these/*.js", "those/*.txt" ]);
```
**Contents**
* [list](#module_file-set#list)
* [files](#module_file-set#files)
* [dirs](#module_file-set#dirs)
* [notExisting](#module_file-set#notExisting)
* [add(files)](#module_file-set#add)

<a name="module_file-set#list"></a>
###fileSet.list
A list of unique paths, all which exist

**Type**: `Array.<string>`  
<a name="module_file-set#files"></a>
###fileSet.files
List of files which exist

**Type**: `Array.<string>`  
<a name="module_file-set#dirs"></a>
###fileSet.dirs
List of dirs which exist

**Type**: `Array.<string>`  
<a name="module_file-set#notExisting"></a>
###fileSet.notExisting
Paths which do not exist

**Type**: `Array.<string>`  
<a name="module_file-set#add"></a>
###fileSet.add(files)
add files to the set


- files `string | Array.<string>` - the files to add

