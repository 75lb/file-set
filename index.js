import { glob } from 'glob'
import arrayify from 'array-back'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import os from 'node:os'

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
    for (const file of files) {
      try {
        const stat = await fs.stat(file)
        if (stat.isFile() && !this.files.includes(file)) {
          this.files.push(file)
        } else if (stat.isDirectory() && !this.dirs.includes(file)) {
          this.dirs.push(file.endsWith(path.sep) ? file : `${file}${path.sep}`)
        }
      } catch (err) {
        if (err.code === 'ENOENT') {
          const posixPath = os.platform() === 'win32'
            ? file.replaceAll(path.sep, path.posix.sep)
            : file
          if (glob.hasMagic(posixPath)) {
            const found = await glob(posixPath, { mark: true })
            if (found.length) {
              for (const match of found) {
                if (match.endsWith(path.sep)) {
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
