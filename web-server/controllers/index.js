const R = require('ramda')
const path = require('path')
const glob = require('glob')
const { folders, exclude = [] } = require('./config')

const absPath = R.partial(path.join, [__dirname])

const controllers = {}
const ignore = R.map(absPath, exclude)
const extractFilename = file => (
  path.basename(file).replace(/.js$/, '')
)

folders.forEach(folder => {
  controllers[folder] = {}
  const files = glob.sync(absPath(folder + '/*'), {
    ignore,
    nodir: true
  })
  const filenames = files.map(extractFilename)
  const contents = files.map(require)
  R.zip(filenames, contents).forEach(([filename, content]) => {
    controllers[folder][filename] = content
  })
})

module.exports = controllers
