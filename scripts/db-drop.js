require('dotenv').config()
const mysql = require('mysql')

const connection = mysql.createConnection({
  host: process.env.SQL_HOST,
  user: process.env.SQL_USERNAME,
  password: process.env.SQL_PASSWORD
})

connection.connect((err) => {
  if (err) {
    console.error('Can not connect to MySQL')
    process.exit(1)
  }
  connection.query(
    'DROP DATABASE IF EXISTS ' + process.env.SQL_DATABASE,
    null, (err, res) => {
      if (err) {
        console.error(err)
        process.exit(1)
      }
      console.log('Database ' + process.env.SQL_DATABASE + ' dropped')
      connection.end(err => {
        if (err) {
          console.error(err)
          process.exit(1)
        }
        process.exit(0)
      })
    })
})
