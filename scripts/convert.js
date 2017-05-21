const convertPDF = require('../web-server/convert-pdf')
const path = require('path')

if (!process.argv[2] || !process.argv[3]) {
  console.log('Source file and destination directory arguments needed')
  process.exit(1)
}

const src = path.join(process.cwd(), process.argv[2])
const destDir = path.join(process.cwd(), process.argv[3])

convertPDF(src, destDir)
  .then(pages => {
    console.log(`${pages} pages converted to images and put to ${destDir}`)
    process.exit(0)
  })
  .catch(err => {
    console.log(`Failed to convert pdf pages from ${src}`)
    console.log(err)
    process.exit(1)
  })
