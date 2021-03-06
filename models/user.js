const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    token: {
      type: DataTypes.STRING
    },
  }, {timestamps: false});
  //encrypting the password
  User.beforeCreate((user) => {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
  })
  //generating token
  User.prototype.generateToken = function () {
    let newtoken = jwt.sign(this.id, process.env.SECRET_KEY);
    return newtoken;
  }

  //association in user
  // User.associate = (models) => {
  //   User.hasOne(models.Contact, {
  //     foreignKey: 'userId'
  //   });
  // };
//   User.associate = (models) => {
//     User.hasOne(models.Contact, {
//       foreignKey: 'userId'
//     });
//     User.hasMany(models.Project, {
//       foreignKey: 'userId'
//     })
//     User.belongsToMany(models.Team, {
//       through: 'members'
//     })
//   };

  return User;
};