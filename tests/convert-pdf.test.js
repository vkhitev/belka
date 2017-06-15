const convertPDF = require('../api-server/convert-pdf')
const path = require('path')
const fs = require('fs')
const mkdirp = require('mkdirp')
const rimraf = require('rimraf')
const { describe, it } = require('mocha')

describe('PDF converter', function () {
  this.timeout(20000)

  const pathToPdf = path.join(__dirname, 'pdf/test.pdf')
  const pathToNonPdf = path.join(__dirname, 'nonpdf.js')
  const pathToNothing = path.join(__dirname, 'pdf/no-such-file')
  const pathToSlides = path.join(__dirname, 'pdf/slides')
  const pathToNonExistingFolder = path.join(__dirname, 'pdf/slides_2')
  const pathToNonExistingSubFolder = path.join(__dirname, 'pdf/slides_2/123')

  it('should store 15 buffers if file is valid', function (done) {
    convertPDF(pathToPdf)
      .then(res => {
        if (res.length === 15) {
          return done()
        }
        done('Wrong behavior')
      })
      .catch(done)
  })

  it('should store 15 images in file system if file is valid', function (done) {
    mkdirp.sync(pathToSlides)
    convertPDF(pathToPdf, { path: pathToSlides })
      .then(pathes => {
        const filesExist = pathes.every(p => path.isAbsolute(p) && fs.existsSync(p))
        if (pathes.length === 15 && filesExist) {
          pathes.forEach(p => fs.unlinkSync(p))
          rimraf.sync(pathToSlides)
          return done()
        }
        done('Wrong behavior')
      })
      .catch(done)
  })

  it('should create destination folder if it does not exist', function (done) {
    convertPDF(pathToPdf, { path: pathToNonExistingSubFolder })
      .then(pathes => {
        const filesExist = pathes.every(p => path.isAbsolute(p) && fs.existsSync(p))
        if (pathes.length === 15 && filesExist) {
          pathes.forEach(p => fs.unlinkSync(p))
          rimraf.sync(pathToNonExistingFolder)
          return done()
        }
        done('Wrong behavior')
      })
      .catch(done)
  })

  it('should throw error if source file is not pdf', function (done) {
    convertPDF(pathToNonPdf)
      .then(res => {
        done('Wrong behavior')
      })
      .catch(() => {
        done()
      })
  })

  it('should throw error if source file does not exist', function (done) {
    convertPDF(pathToNothing)
      .then(res => {
        done('Wrong behavior')
      })
      .catch(() => {
        done()
      })
  })

  it('should throw error if source file path is not string', function (done) {
    convertPDF(123)
      .then(res => {
        done('Wrong behavior')
      })
      .catch(() => {
        done()
      })
  })

  it('should throw error if source path is not absolute', function (done) {
    convertPDF('./cheburek')
      .then(res => {
        done('Wrong behavior')
      })
      .catch(() => {
        done()
      })
  })

  it('should throw error if provided extenstion is not valid', function (done) {
    convertPDF(pathToPdf, { path: pathToSlides, extension: '123' })
      .then(res => {
        done('Wrong behavior')
      })
      .catch(() => {
        done()
      })
  })

  it('should throw error if destination path is not string', function (done) {
    convertPDF(pathToPdf, { path: 123 })
      .then(res => {
        done('Wrong behavior')
      })
      .catch(() => {
        done()
      })
  })

  it('should throw error if destination path is not absolute', function (done) {
    convertPDF(pathToPdf, { path: './cheburek' })
      .then(res => {
        done('Wrong behavior')
      })
      .catch(() => {
        done()
      })
  })
})
