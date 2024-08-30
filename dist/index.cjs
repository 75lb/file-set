'use strict';

var fg = require('fast-glob');
var arrayify = require('array-back');
var node_fs = require('node:fs');
var path = require('node:path');
var os = require('node:os');

class FileSet {
  constructor () {
    /* validation */
    if (arguments.length) {
      throw new Error('new Fileset() does not require any arguments')
    }

    /** • fileSet.files :string[]
    ≈ The existing files found.
    */
    this.files = [];

    /** • fileSet.dirs :string[]
    ≈ The existing directories found. Directory paths will always end with `'/'`.
    */
    this.dirs = [];

    /** • fileSet.notExisting :string[]
    ≈ Paths which were not found.
    */
    this.notExisting = [];
  }

  /** ø fileSet.add(patterns)
  ≈ Add file patterns to the set.
  • [patterns] :string|string[] - One or more file paths or glob expressions to inspect.
  */
  async add (files) {
    files = arrayify(files);
    for (let file of files) {
      file = os.platform() === 'win32'
        ? file.replaceAll(path.win32.sep, path.posix.sep)
        : file;
      try {
        const stat = await node_fs.promises.stat(file);
        if (stat.isFile() && !this.files.includes(file)) {
          this.files.push(file);
        } else if (stat.isDirectory() && !this.dirs.includes(file)) {
          this.dirs.push(file.endsWith(path.sep) ? file : `${file}${path.sep}`);
        }
      } catch (err) {
        if (err.code === 'ENOENT') {
          if (fg.isDynamicPattern(file)) {
            const found = await fg.glob(file, { onlyFiles: false, markDirectories: true });
            if (found.length) {
              for (const match of found) {
                if (match.endsWith(path.posix.sep)) {
                  if (!this.dirs.includes(match)) this.dirs.push(match);
                } else {
                  if (!this.files.includes(match)) this.files.push(match);
                }
              }
            } else {
              if (!this.notExisting.includes(file)) this.notExisting.push(file);
            }
          } else {
            if (!this.notExisting.includes(file)) this.notExisting.push(file);
          }
        } else {
          throw err
        }
      }
    }
  }

  clear () {
    this.files = [];
    this.dirs = [];
    this.notExisting = [];
  }
}

module.exports = FileSet;
