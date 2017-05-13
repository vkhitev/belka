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
    slidesUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    speaker: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate (models) {
        Podcast.belongsTo(models.post, {
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
