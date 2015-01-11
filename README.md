[![view on npm](http://img.shields.io/npm/v/file-set.svg)](https://www.npmjs.org/package/file-set)
[![npm module downloads per month](http://img.shields.io/npm/dm/file-set.svg)](https://www.npmjs.org/package/file-set)
[![Build Status](https://travis-ci.org/75lb/file-set.svg?branch=master)](https://travis-ci.org/75lb/file-set)
[![Dependency Status](https://david-dm.org/75lb/file-set.svg)](https://david-dm.org/75lb/file-set)

#file-set
Exports a contructor taking a list of file patterns as input, returning a `file-set` instance containing the expanded patterns split into separate lists of `files`, `dirs` and `notExisting`.

**Example**  
```js
var fileSet = require("file-set");
```


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

#API
Exports a contructor taking a list of file patterns as input, returning a `file-set` instance containing the expanded patterns split into separate lists of `files`, `dirs` and `notExisting`.

**Example**  
```js
var fileSet = require("file-set");
```

* [file-set](#module_file-set)
  * [class: FileSet](#exp_module_file-set--FileSet) ⏏
    * [new FileSet(patternList)](#new_module_file-set--FileSet_new)
    * _instance_
      * [.list](#module_file-set--FileSet#list) → <code>Array.&lt;string&gt;</code>
      * [.files](#module_file-set--FileSet#files) → <code>Array.&lt;string&gt;</code>
      * [.dirs](#module_file-set--FileSet#dirs) → <code>Array.&lt;string&gt;</code>
      * [.notExisting](#module_file-set--FileSet#notExisting) → <code>Array.&lt;string&gt;</code>
      * [.add(files)](#module_file-set--FileSet#add)
    * _static_
      * [enum: .eFileType](#module_file-set--FileSet.eFileType) → <code>number</code>

<a name="exp_module_file-set--FileSet"></a>
###class: FileSet ⏏
Expands file patterns, returning the matched and unmatched files and directories

<a name="new_module_file-set--FileSet_new"></a>
####new FileSet(patternList)
| Param | Type | Description |
| ----- | ---- | ----------- |
| patternList | <code>string</code> \| <code>Array.&lt;string&gt;</code> | A pattern, or array of patterns to expand |

<a name="module_file-set--FileSet#list"></a>
####fileSet.list → <code>Array.&lt;string&gt;</code>
The full list of unique paths found, and not found.

<a name="module_file-set--FileSet#files"></a>
####fileSet.files → <code>Array.&lt;string&gt;</code>
The existing files found

<a name="module_file-set--FileSet#dirs"></a>
####fileSet.dirs → <code>Array.&lt;string&gt;</code>
The existing directories found

<a name="module_file-set--FileSet#notExisting"></a>
####fileSet.notExisting → <code>Array.&lt;string&gt;</code>
Paths which were not found

<a name="module_file-set--FileSet#add"></a>
####fileSet.add(files)
add file patterns to the set

| Param | Type | Description |
| ----- | ---- | ----------- |
| files | <code>string</code> \| <code>Array.&lt;string&gt;</code> | A pattern, or array of patterns to expand |

<a name="module_file-set--FileSet.eFileType"></a>
####enum: FileSet.eFileType → <code>number</code>
Enum for the `type` value of each record in `fileSet.list`

**Properties**

| Name | Type | Default | Description |
| ---- | ---- | ------- |----------- |
| NOEXIST | <code>number</code> | `0` | when a file doesn't exist |
| FILE | <code>number</code> | `1` | It's a file |
| DIR | <code>number</code> | `2` |  |

**Read only**: true  


*documented by [jsdoc-to-markdown](https://github.com/75lb/jsdoc-to-markdown)*
