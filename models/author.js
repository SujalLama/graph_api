module.exports = (sequelize, DataTypes) => {
  const Author = sequelize.define('authors', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {timestamps: false});


  Author.associate = (models) => {
    Author.hasMany(models.Book);
  };

  return Author;
};