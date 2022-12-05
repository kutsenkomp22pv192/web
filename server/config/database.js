const {Sequelize} = require('sequelize');

const sequelize = new Sequelize({
    database: 'discord',
    username: 'root',
    password: '123)Masha',
    logging: console.log,
    host: 'db',
    dialect: 'mysql',
    port:"3306"
});

module.exports = sequelize

global.sequelize = sequelize