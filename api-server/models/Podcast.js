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
      type: DataTypes.STRING
    },
    slidesUrl: {
      type: DataTypes.STRING
    },
    speaker: DataTypes.STRING
  }, {
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
