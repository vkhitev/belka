require('dotenv').config()
const Sequelize = require('sequelize')

const { SQL_DIALECT, SQL_USERNAME, SQL_PASSWORD, SQL_HOST, SQL_PORT, SQL_DATABASE } = process.env
const url = `${SQL_DIALECT}://${SQL_USERNAME}:${SQL_PASSWORD}@${SQL_HOST}:${SQL_PORT}/${SQL_DATABASE}`
return new Sequelize(url)
  .authenticate()
  .then(() => {
    console.log(`Connected to ${url}`)
    process.exit(0)
  })
  .catch(err => {
    console.error(`Unable to connect to ${url}`)
    console.error(err.message)
    process.exit(1)
  })
