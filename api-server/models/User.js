module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    hash: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })
  return User
}
