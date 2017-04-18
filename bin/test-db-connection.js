const debug = require('debug')('sequelize')

module.exports = function testDbConnection (sequelize) {
  const { dialect, username, password, port, host, database } = sequelize.options
  const url = `${dialect}://${username}:${password}@${host}:${port}/${database}`
  return sequelize
    .authenticate()
    .then(() => {
      debug(`Connected to ${url}`)
      return sequelize
    })
    .catch(err => {
      console.error(`Unable to connect to ${url}`)
      console.error(err.message)
      process.exit(1)
    })
}
