module.exports = {
  development: {
    database: 'belka',
    dialect: 'mysql',
    username: 'vkhitev',
    password: 'admin',
    port: 3306
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'mysql'
  },
  staging: {
    url: process.env.DATABASE_URL,
    dialect: 'mysql'
  },
  test: {
    url: process.env.DATABASE_URL || '',
    dialect: 'mysql'
  }
}
