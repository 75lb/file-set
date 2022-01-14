[![view on npm](https://badgen.net/npm/v/file-set)](https://www.npmjs.org/package/file-set)
[![npm module downloads](https://badgen.net/npm/dt/file-set)](https://www.npmjs.org/package/file-set)
[![Gihub repo dependents](https://badgen.net/github/dependents-repo/75lb/file-set)](https://github.com/75lb/file-set/network/dependents?dependent_type=REPOSITORY)
[![Gihub package dependents](https://badgen.net/github/dependents-pkg/75lb/file-set)](https://github.com/75lb/file-set/network/dependents?dependent_type=PACKAGE)
[![Node.js CI](https://github.com/75lb/file-set/actions/workflows/node.js.yml/badge.svg)](https://github.com/75lb/file-set/actions/workflows/node.js.yml)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/feross/standard)

# file-set

Expands a list of paths and glob expressions into three sets: "files", "directories" and "not existing". Each set in the output is a list of unique paths.

The library saves you the job of learning a globbing library, expanding a glob expression (e.g. `lib/**/*`), sifting through each result testing whether it's a file, directory or neither.

## Usage

Expand two glob expressions (`'*'` and `'not/existing/*'`).

```js
import FileSet from 'file-set'
const fileSet = new FileSet()
await fileSet.add([ '*', 'not/existing/*' ])
console.log(fileSet)
```

The output has been organised into sets.

```
FileSet {
  files: [ 'LICENSE', 'package.json', 'README.md' ],
  dirs: [ 'jsdoc2md/', 'lib/', 'node_modules/', 'test/' ],
  notExisting: [ 'not/existing/*' ]
}
```

# API

<a name="module_file-set"></a>

## file-set

* [file-set](#module_file-set)
    * [FileSet](#exp_module_file-set--FileSet) ⏏
        * [new FileSet()](#new_module_file-set--FileSet_new)
        * [.files](#module_file-set--FileSet+files) : <code>Array.&lt;string&gt;</code>
        * [.dirs](#module_file-set--FileSet+dirs) : <code>Array.&lt;string&gt;</code>
        * [.notExisting](#module_file-set--FileSet+notExisting) : <code>Array.&lt;string&gt;</code>
        * [.add(files)](#module_file-set--FileSet+add)

<a name="exp_module_file-set--FileSet"></a>

### FileSet ⏏
**Kind**: Exported class  
<a name="new_module_file-set--FileSet_new"></a>

#### new FileSet()

<a name="module_file-set--FileSet+files"></a>

#### fileSet.files : <code>Array.&lt;string&gt;</code>
The existing files found

**Kind**: instance property of [<code>FileSet</code>](#exp_module_file-set--FileSet)  
<a name="module_file-set--FileSet+dirs"></a>

#### fileSet.dirs : <code>Array.&lt;string&gt;</code>
The existing directories found. Directory paths will always end with `'/'`.

**Kind**: instance property of [<code>FileSet</code>](#exp_module_file-set--FileSet)  
<a name="module_file-set--FileSet+notExisting"></a>

#### fileSet.notExisting : <code>Array.&lt;string&gt;</code>
Paths which were not found

**Kind**: instance property of [<code>FileSet</code>](#exp_module_file-set--FileSet)  
<a name="module_file-set--FileSet+add"></a>

#### fileSet.add(patterns)
Add file patterns to the set.

**Kind**: instance method of [<code>FileSet</code>](#exp_module_file-set--FileSet)  

| Param | Type | Description |
| --- | --- | --- |
| patterns | <code>string</code> \| <code>Array.&lt;string&gt;</code> | One or more file paths or glob expressions to inspect. |


* * *

&copy; 2014-22 Lloyd Brookes \<75pound@gmail.com\>.

Tested by [test-runner](https://github.com/test-runner-js/test-runner).
