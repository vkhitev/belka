const convertPDF = require('./convert-pdf')

const src = './2.pdf'
const destDir = './tmp'

convertPDF(src, destDir)
  .then(pages => {
    console.log(`${pages} pages converted to ${destDir}`)
  })
  .catch(err => {
    console.log(`Failed to convert pdf pages from ${src}`)
    console.log(err)
  })
