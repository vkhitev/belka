exports.paginateBy = function paginateBy (maxItemsOnPage, pattern = /items (\d+-\d+)\/(\d+)/) {
  return function (handler) {
    return function paginate (req, res, next) {
      req.pagination = {
        count: maxItemsOnPage || 20,
        offset: (req.params.page - 1) * maxItemsOnPage || 0,
        create: createPagination
      }
      handler(req, res, next)

      function createPagination (contentRange) {
        const currentPage = Number(req.params.page) || 1
        const { total } = parseContentRange(contentRange)
        const pagesCount = Math.ceil(total / maxItemsOnPage)

        return {
          multiPages: pagesCount > 1,
          href: req.originalUrl.replace(/\/$/, '').replace(/\/page.*$/, '') + '/page',
          previousPage: currentPage - 1,
          nextPage: currentPage + 1,
          isFirst: currentPage === 1,
          isLast: currentPage === pagesCount,
          pages: range(pagesCount).map(i => ({
            page: i + 1,
            isActive: i + 1 === currentPage
          }))
        }
      }
    }
  }

  function parseContentRange (contentRange) {
    const match = contentRange.match(pattern)
    const range = match[1].split('-').map(Number)
    const total = Number(match[2])
    return { range, total }
  }
}

function range (n) {
  return [...Array(n).keys()]
}
