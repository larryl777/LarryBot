const Sequelize = require('sequelize');
const sequelize = require("../utilities/db");

const UserProfile = sequelize.define('UserProfile',{
    userID: {
    type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
    },
    name:{
    type: Sequelize.STRING,
    allowNull: false,
    },
    bday:{
    type: Sequelize.STRING,
    allowNull: false,
    },
    favoritefood:{
    type: Sequelize.STRING,
    allowNull: false,
    },
    favoritegame:{
    type: Sequelize.STRING,
    allowNull: false,
    }
});

module.exports = UserProfile; 