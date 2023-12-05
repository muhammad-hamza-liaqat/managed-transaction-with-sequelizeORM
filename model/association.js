const accountModel = require("./accountModel");
const transectionModel = require("./transectionModel");

// define the association now
transectionModel.belongsTo(accountModel, {
  foreignKey: "sender_account_number",
});
transectionModel.belongsTo(accountModel, {
  foreignKey: "receiver_account_number",
});

accountModel.hasMany(transectionModel, {
  foreignKey: "sender_account_number",
  as: "senderAccount",
});
accountModel.hasMany(transectionModel, {
  foreignKey: "receiver_account_number",
  as: "receiverAccount",
});
