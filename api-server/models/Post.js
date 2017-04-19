const moment = require('moment')
moment.locale('ru')

module.exports = function (sequelize, DataTypes) {
  const Post = sequelize.define('Post', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
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
      },
      get () {
        const date = moment.utc(this.getDataValue('eventDate'))
        if (date.year() === moment().year()) {
          return date.format('LL').slice(0, -8)
        } else {
          return date.format('LL')
        }
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
        Post.hasMany(models.Podcast)
      }
    }
  })
  return Post
}
