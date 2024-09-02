const Sequelize = require('sequelize');
const sequelize = require("../utilities/db");

const cussTrack = sequelize.define('cussTrack', {
    userID:{
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
    },
    counter:{
        type: Sequelize.INTEGER,
        default: 0,
        allowNull: false,
    },

});

module.exports = cussTrack;