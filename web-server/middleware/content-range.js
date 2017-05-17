function parseContentRange (contentRange) {
  const range = contentRange.match(/items (\d+-\d+)/)[1].split('-')
  const total = contentRange.match(/\/(\d+)/)[1]
  return { range, total }
}

function addContentRange (req, res, next) {
  req.contentRange = parseContentRange(req.contentRange)
  next()
}

module.exports = addContentRange
