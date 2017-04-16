module.exports = function (sequelize, DataTypes) {
  const Post = sequelize.define('Post', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: DataTypes.STRING,
    event_date: DataTypes.DATEONLY,
    preview_url: DataTypes.STRING,
    brief: DataTypes.STRING,
    organizer_name: DataTypes.STRING,
    organizer_link: DataTypes.STRING
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
