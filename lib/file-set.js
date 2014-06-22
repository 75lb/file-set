var fs = require("fs"),
    glob = require("glob"),
    Glob = glob.Glob,
    a = require("array-tools");

/**
Exports a single function which expands file patterns, returning an object containing the input files split into separate lists.
@module
@example
```js
var fileSet = require("file-set");
```
@alias fileSet
*/
module.exports = FileSet;

/**
@class
@param {string[]} files - The input file patterns to expand
@returns {object}
@example
```js
var thoseFiles = fileSet([ "these/*.js", "those/*.txt" ]);
```
@alias module:file-set
*/
function FileSet(files){
	if (!(this instanceof FileSet)) return new FileSet(files);

    /**
	A list of unique paths, all which exist
	@type {string[]}
	*/
    this.list = [];
    /**
	List of files which exist
	@type {string[]}
	*/
    this.files = [];
    /**
	List of dirs which exist
	@type {string[]}
	*/
    this.dirs = [];
    /**
	Paths which do not exist
	@type {string[]}
	*/
    this.notExisting = [];

    this.add(files);
}
/**
add files to the set
@param files {string|string[]} - the files to add
*/
FileSet.prototype.add = function(files){
    var self = this,
        nonExistingFiles = [];

    files = a.arrayify(files);
    files.forEach(function(file){
        try {
            var stat = fs.statSync(file),
                fileSetItem = { path: file };

            if (!a.exists(self.list, fileSetItem)){
                if (stat.isFile()){
                    fileSetItem.type = FileSet.FILE;
                    self.files.push(file);
                }
                if (stat.isDirectory()){
                    fileSetItem.type = FileSet.DIR;
                    self.dirs.push(file);
                }
                self.list.push(fileSetItem);
            }
        } catch(err){
            if (err.code === "ENOENT"){
                nonExistingFiles.push(file);
            }
        }
    });

    nonExistingFiles.forEach(function(file){
        var glob = new Glob(file, { sync: true, stat: true });
        if (glob.found.length){
            glob.found.forEach(function(file){
                if (!a.exists(self.list, { path: file })){
                    if (glob.cache[file] instanceof Array) glob.cache[file] = 2;
                    var fileSetItem = { path: file, type: glob.cache[file] };
                    self.list.push(fileSetItem);

                    if (fileSetItem.type === 1) self.files.push(file);
                    if (fileSetItem.type === 2) self.dirs.push(file);
                }
            });
        } else {
            self.list.push({ path: file, type: FileSet.NOEXIST });
            self.notExisting.push(file);
        }
    });
};

/**
@const {number}
@default
*/
FileSet.NOEXIST = 0;
/**
@const {number}
@default
*/
FileSet.FILE = 1;
/**
@const {number}
@default
*/
FileSet.DIR = 2;

function FileSetItem(){
    this.path = null;
    this.type = null;
}
