module.exports = {
  development: {
    dialect: process.env.SQL_DIALECT,
    username: process.env.SQL_USERNAME,
    password: process.env.SQL_PASSWORD,
    host: process.env.SQL_HOST,
    port: process.env.SQL_PORT,
    database: process.env.SQL_DATABASE,
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
