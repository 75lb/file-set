import fg from 'fast-glob'
import arrayify from 'array-back'
import { promises as fs } from 'fs'
import path from 'path'
import os from 'os'

class FileSet {
  constructor () {
    /* validation */
    if (arguments.length) {
      throw new Error('new Fileset() does not require any arguments')
    }

    /** • fileSet.files :string[]
    ≈ The existing files found.
    */
    this.files = []

    /** • fileSet.dirs :string[]
    ≈ The existing directories found. Directory paths will always end with `'/'`.
    */
    this.dirs = []

    /** • fileSet.notExisting :string[]
    ≈ Paths which were not found.
    */
    this.notExisting = []
  }

  /** ø fileSet.add(patterns)
  ≈ Add file patterns to the set.
  • [patterns] :string|string[] - One or more file paths or glob expressions to inspect.
  */
  async add (files) {
    files = arrayify(files)
    for (let file of files) {
      /* Force all incoming file paths and glob expressions to use posix separators */
      file = os.platform() === 'win32'
        ? file.replace(/\\/g, path.posix.sep)
        : file
      try {
        const stat = await fs.stat(file)
        if (stat.isFile() && !this.files.includes(file)) {
          this.files.push(file)
        } else if (stat.isDirectory() && !this.dirs.includes(file)) {
          this.dirs.push(file.endsWith(path.posix.sep) ? file : `${file}${path.posix.sep}`)
        }
      } catch (err) {
        if (err.code === 'ENOENT') {
          if (fg.isDynamicPattern(file)) {
            const found = await fg.glob(file, { onlyFiles: false, markDirectories: true })
            if (found.length) {
              for (const match of found) {
                if (match.endsWith(path.posix.sep)) {
                  if (!this.dirs.includes(match)) this.dirs.push(match)
                } else {
                  if (!this.files.includes(match)) this.files.push(match)
                }
              }
            } else {
              if (!this.notExisting.includes(file)) this.notExisting.push(file)
            }
          } else {
            if (!this.notExisting.includes(file)) this.notExisting.push(file)
          }
        } else {
          throw err
        }
      }
    }
  }

  clear () {
    this.files = []
    this.dirs = []
    this.notExisting = []
  }
}

export default FileSet
