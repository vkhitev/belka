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
    name: DataTypes.STRING,
    eventDate: {
      type: DataTypes.DATEONLY,
      field: 'event_date',
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
      field: 'preview_url'
    },
    organizerName: {
      type: DataTypes.STRING,
      field: 'organizer_name'
    },
    organizerLink: {
      type: DataTypes.STRING,
      field: 'organizer_link'
    },
    brief: DataTypes.STRING
  }, {
    tableName: 'post',
    classMethods: {
      associate (models) {
        Post.hasMany(models.Podcast)
      }
    }
  })
  return Post
}
