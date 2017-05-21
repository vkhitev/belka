module.exports = function (sequelize, DataTypes) {
  const PodcastSlide = sequelize.define('podcastSlide', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    syncTime: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })
  return PodcastSlide
}
