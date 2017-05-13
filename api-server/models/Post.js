module.exports = function (sequelize, DataTypes) {
  const Post = sequelize.define('post', {
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
    },
    eventDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true
      }
    },
    previewUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'content/preview/default.svg'
    },
    organizerName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // 사랑해 <3))
    organizerLink: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true
      }
    },
    brief: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: true
      }
    }
  }, {
    classMethods: {
      associate (models) {
        Post.belongsToMany(models.category, { through: 'postCategory' })
      }
    }
  })
  return Post
}
