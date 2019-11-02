/**
 * Exports a contructor taking a list of file patterns as input, returning a `file-set` instance containing the expanded patterns split into separate lists of `files`, `dirs` and `notExisting`.
 * @module file-set
 * @example
 * ```js
 * const FileSet = require('file-set')
 * ```
 */

const glob = require('glob')
const arrayify = require('array-back')

/**
 * Expands file patterns, returning the matched and unmatched files and directories.
 * @param {string | string[]} - A pattern, or array of patterns to expand.
 * @alias module:file-set
 */
class FileSet {
  constructor (patternList) {
    /**
     * The existing files found
     * @type {string[]}
     */
    this.files = []

    /**
     * The existing directories found
     * @type {string[]}
     */
    this.dirs = []

    /**
     * Paths which were not found
     * @type {string[]}
     */
    this.notExisting = []

    this.add(patternList)
  }

  /**
   * add file patterns to the set
   * @param files {string|string[]} - A pattern, or array of patterns to expand
   */
  add (files) {
    const fs = require('fs')

    files = arrayify(files)
    for (const file of files) {
      try {
        const stat = fs.statSync(file)
        if (stat.isFile()) {
          if (this.files.indexOf(file) === -1) this.files.push(file)
        } else if (stat.isDirectory()) {
          if (this.dirs.indexOf(file) === -1) this.dirs.push(file)
        }
      } catch (err) {
        if (err.code === 'ENOENT') {
          const found = glob.sync(file, { mark: true })
          if (found.length) {
            for (const match of found) {
              if (match.endsWith('/')) {
                if (this.dirs.indexOf(match) === -1) this.dirs.push(match)
              } else {
                if (this.files.indexOf(match) === -1) this.files.push(match)
              }
            }
          } else {
            if (this.notExisting.indexOf(file) === -1) this.notExisting.push(file)
          }
        } else {
          throw err
        }
      }
    }
  }
}

module.exports = FileSet
