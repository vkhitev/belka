module.exports = function (sequelize, DataTypes) {
  const Podcast = sequelize.define('Podcast', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: DataTypes.STRING,
    audio_url: DataTypes.STRING,
    slides_url: DataTypes.STRING,
    speaker: DataTypes.STRING,
    post_id: DataTypes.INTEGER
  }, {
    tableName: 'podcast',
    classMethods: {
      associate (models) {
        Podcast.belongsTo(models.Post)
      }
    }
  })
  return Podcast
}
