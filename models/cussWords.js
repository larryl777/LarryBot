const Sequelize = require('sequelize');
const sequelize = require("../utilities/db");

const cussWords= sequelize.define('cussWords', {
    word:{
        type: Sequelize.STRING,
        allowNull: false
    },
    guildId:{
        type: Sequelize.STRING,
        allowNull: false,
    },

});

module.exports = cussWords;