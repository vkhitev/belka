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
      freezeTableName: true,
      underscored: false
    },
    charset: 'utf8mb4',
    migrationStorage: 'sequelize',
    migrationStorageTableName: 'sequelize_meta',
    seederStorage: 'sequelize',
    seederStorageTableName: 'sequelize_data',
    logging: false
  },
  production: {
  },
  staging: {
  },
  test: {
  }
}
