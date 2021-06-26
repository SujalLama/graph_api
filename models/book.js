
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('books', {
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
    description: {
      type: DataTypes.TEXT,
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    authorId: {
      type: DataTypes.INTEGER
    }
  }, {timestamps: false});


  Book.associate = (models) => {
    Book.belongsTo(models.Author);
  };

  return Book;
};