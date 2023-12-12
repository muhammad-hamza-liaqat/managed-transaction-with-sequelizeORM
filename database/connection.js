const { Sequelize, DataTypes } = require('sequelize');

    // connected to the database, classical => SQL with sequelize
    const sequelize = new Sequelize('classical', 'root', '', {
    host: 'localhost',
    dialect: 'mysql', 
    })

sequelize.authenticate().then(() => {
    console.log('connected to mySQL');
    sequelize.sync();
    console.log("sync with MYSQL")
 }).catch((error) => {
    console.error('database not connected...!');
 });


module.exports = sequelize