module.exports = function (sequelize, DataTypes) {
  const Podcast = sequelize.define('podcast', {
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
    audioUrl: {
      type: DataTypes.STRING,
      allowNull: false
    },
    speaker: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate (models) {
        Podcast.belongsTo(models.Post, {
          onDelete: 'CASCADE',
          foreignKey: {
            allowNull: false
          }
        })

        Podcast.hasMany(models.PodcastSlide, {
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
