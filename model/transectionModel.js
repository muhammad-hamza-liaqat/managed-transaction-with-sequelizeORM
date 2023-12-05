const { DataTypes } = require("sequelize");
const sequelize = require("../database/connection");

// define relationship between account and transection models
const AccountModel = require("./accountModel");

const transectionModel = sequelize.define("transections", {
  sender_account_number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  receiver_account_number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  
  // status_of_transections:{
  //   type:DataTypes.STRING,
  //   defaultValue:"pending"
  // },
  transection_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
},{timestamps: false});


module.exports = transectionModel;
