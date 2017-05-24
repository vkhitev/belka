const gm = require('gm')
const path = require('path')
const Promise = require('bluebird')
const { Range } = require('immutable')

function countPages (src) {
  return new Promise((resolve, reject) => {
    gm(src).identify('x', (err, data) => {
      if (err) {
        return reject(err)
      }
      resolve(data.length)
    })
  })
}

function createConverter (src, destDir, ext) {
  return function convertPage (pageNum) {
    return new Promise((resolve, reject) => {
      gm(`${src}[${pageNum}]`)
      .write(path.join(destDir, `${pageNum + 1}.${ext}`), (err) => {
        if (err) {
          return reject(err)
        }
        resolve()
      })
    })
  }
}

module.exports = async function convertPDF (src, destDir, ext = 'png') {
  const numberOfPages = await countPages(src)
  const convertPage = createConverter(src, destDir, ext)
  await Promise.all(Range(0, numberOfPages).map(convertPage))
  return numberOfPages
}
