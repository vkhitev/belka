module.exports = function (sequelize, DataTypes) {
  const Category = sequelize.define('category', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        max: 255
      }
    }
  }, {
    classMethods: {
      associate (models) {
        Category.belongsToMany(models.post, { through: 'postCategory' })
      }
    }
  })
  return Category
}
