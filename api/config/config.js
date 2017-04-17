module.exports = {
  development: {
    dialect: 'mysql',
    database: process.env.SQL_DB,
    username: process.env.SQL_USR,
    password: process.env.SQL_PASS,
    port: 3306,
    define: {
      timestamps: false,
      underscored: true,
      freezeTableName: true
    }
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
