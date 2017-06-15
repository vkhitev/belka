const convertPDF = require('../api-server/convert-pdf')
const path = require('path')

const pathToPdf = path.join(__dirname, 'pdf/test.pdf')
const pathToSlides = path.join(__dirname, 'pdf/slides')

convertPDF(pathToPdf, { destination: 'memory' })
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.log(err)
  })
