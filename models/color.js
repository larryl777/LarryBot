const Sequelize = require('sequelize');
const sequelize = require("../utilities/db");

const Color = sequelize.define('Color', {
    userID:{
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
    },
    color:{
        type: Sequelize.STRING,
        allowNull: false,
    },
});

module.exports = Color;