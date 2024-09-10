const { Model, DataTypes } = require('sequelize');
const sequelize = require('./index');
const bcrypt = require('bcrypt');

class User extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password)
    }
}

User.init({
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    hooks: {
        beforeCreate: async (newUser) => {
            newUser.password = await bcrypt.hash(newUser.password);
            return newUser;
        },
        beforeUpdate: async (updatedUser) => {
           if (updatedUser.password) {
            updatedUser.password = await bcrypt.hash(updatedUser.password);
        } 
        return updatedUser;
    },
   },
   sequelize, modelName: 'User', 
});

module.exports = User;