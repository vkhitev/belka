const gm = require('gm')
const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const Promise = require('bluebird')
const mime = require('mime')
const mkdirp = require('mkdirp')
const { range } = require('ramda')

function generateFilename (extension, cb) {
  crypto.pseudoRandomBytes(16, function (err, raw) {
    if (err) {
      return cb(err)
    }
    cb(null, raw.toString('hex') + Date.now() + '.' + extension)
  })
}

function countPages (src) {
  return new Promise((resolve, reject) => {
    gm(src).identify('1', (err, data) => {
      if (err) {
        return reject(err)
      }
      resolve(data.length)
    })
  })
}

module.exports = async function convertPDF (source, destination = 'memory') {
  function convertPage (pageNumber) {
    return new Promise((resolve, reject) => {
      const processedPage = gm(`${source}[${pageNumber}]`)
      if (destination === 'memory') {
        processedPage.toBuffer((err, buffer) => {
          if (err) {
            return reject(err)
          }
          resolve(buffer)
        })
      } else {
        generateFilename(destination.extension, (err, filename) => {
          if (err) {
            return reject(err)
          }
          processedPage.write(path.join(destination.path, filename), (err) => {
            if (err) {
              return reject(err)
            }
            resolve(path.join(destination.path, filename))
          })
        })
      }
    })
  }

  function createDirIfNotExist () {
    return new Promise((resolve, reject) => {
      fs.stat(destination.path, (err, stats) => {
        if (err && err.code === 'ENOENT') {
          mkdirp(destination.path, (err) => {
            if (err) {
              return reject(err)
            }
            resolve()
          })
        } else if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }

  if (!path.isAbsolute(source)) {
    throw new Error('Path to file should be absolute')
  }
  if (mime.lookup(source) !== 'application/pdf') {
    throw new Error('File should be PDF')
  }
  if (destination !== 'memory') {
    destination.extension = destination.extension || 'png'
    if (typeof destination.path !== 'string') {
      throw new Error('Destination path should be a string')
    }
    if (!path.isAbsolute(destination.path)) {
      throw new Error('Destination path should be valid absolute path')
    }
    if (!/(jpg|jpeg|png|gif|bmp)/.test(destination.extension)) {
      throw new Error('Extension should be of type: jpg|jpeg|png|gif|bmp')
    }
  }

  try {
    const nPages = await countPages(source)
    if (destination !== 'memory') {
      await createDirIfNotExist()
    }
    return Promise.all(range(0, nPages).map(convertPage))
  } catch (err) {
    throw err
  }
}
