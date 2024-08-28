const Sequelize = require('sequelize');     //database using sql and ORM Sequelize

const sequelize = new Sequelize('db', 'user', 'pass',{
    dialect: 'sqlite',
    host: 'localhost',      // use local host
    storage: 'db.sqlite',
    logging: false
});

module.exports = sequelize;