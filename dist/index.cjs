'use strict';

var glob = require('glob');
var arrayify = require('array-back');
var origFs = require('fs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var glob__default = /*#__PURE__*/_interopDefaultLegacy(glob);
var arrayify__default = /*#__PURE__*/_interopDefaultLegacy(arrayify);
var origFs__namespace = /*#__PURE__*/_interopNamespace(origFs);

const fs = origFs__namespace.promises;

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
    files = arrayify__default["default"](files);
    for (const file of files) {
      try {
        const stat = await fs.stat(file);
        if (stat.isFile() && !this.files.includes(file)) {
          this.files.push(file);
        } else if (stat.isDirectory() && !this.dirs.includes(file)) {
          this.dirs.push(file.endsWith('/') ? file : `${file}/`);
        }
      } catch (err) {
        if (err.code === 'ENOENT') {
          if (glob__default["default"].hasMagic(file)) {
            const found = await doGlob(file);
            if (found.length) {
              for (const match of found) {
                if (match.endsWith('/')) {
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

async function doGlob (pattern) {
  return new Promise((resolve, reject) => {
    glob__default["default"](pattern, { mark: true }, (err, matches) => {
      if (err) {
        reject(err);
      } else {
        resolve(matches);
      }
    });
  })
}

module.exports = FileSet;
