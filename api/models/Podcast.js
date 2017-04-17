module.exports = function (sequelize, DataTypes) {
  const Podcast = sequelize.define('Podcast', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: DataTypes.STRING,
    audioUrl: {
      type: DataTypes.STRING,
      field: 'audio_url'
    },
    slidesUrl: {
      type: DataTypes.STRING,
      field: 'slides_url'
    },
    speaker: DataTypes.STRING
  }, {
    tableName: 'podcast',
    classMethods: {
      associate (models) {
        Podcast.belongsTo(models.Post, {
          onDelete: 'CASCADE',
          foreignKey: {
            allowNull: false
          }
        })
      }
    }
  })
  return Podcast
}
