const { Sequelize, DataTypes } = require('sequelize');

    const sequelize = new Sequelize('classical', 'root', '', {
    host: 'localhost',
    dialect: 'mysql', //which database you're using such as sql postgress
    })

sequelize.authenticate().then(() => {
    console.log('connected to mySQL');
    sequelize.sync();
 }).catch((error) => {
    console.error('database not connected...!');
 });


module.exports = sequelize