[![view on npm](http://img.shields.io/npm/v/file-set.svg)](https://www.npmjs.org/package/file-set)
[![npm module downloads per month](http://img.shields.io/npm/dm/file-set.svg)](https://www.npmjs.org/package/file-set)
[![Build Status](https://travis-ci.org/75lb/file-set.svg?branch=master)](https://travis-ci.org/75lb/file-set)
[![Dependency Status](https://david-dm.org/75lb/file-set.svg)](https://david-dm.org/75lb/file-set)


#file-set API
Expands file patterns, returning the matched and unmatched files and directories.

####Examples
```js
var FileSet = require("file-set");

var fileSet = FileSet([ "these/*.js", "those/*.txt" ]);
```





##class: file-set



- files `string[]` The input files to stat  

####Examples
```js
var fileStats = new FileSet([ "lib/src/*", "test/*"]);
```





###fileSet.list
A list of unique paths, all which exist


###fileSet.files
List of files which exist


###fileSet.dirs
List of dirs which exist


###fileSet.notExisting
Paths which do not exist





###fileSet.add(files)
add files to the set


- files `string | Array.<string>` the files to add  












