const sequelize = require("../database/connection");
const accountModel = require("../model/accountModel");
const transectionModel = require("../model/transectionModel");

async function transection(req, res) {
  const { senderAccountNumber, receiverAccountNumber, amount } = req.body;

  try {
    if (!senderAccountNumber || !receiverAccountNumber || !amount) {
      throw new Error('All fields are required');
    }
    if (!senderAccountNumber || senderAccountNumber.amount < 50){
      res.send("not meet minimum balance")
    }

    await sequelize.transaction(async (t) => {
      const sender = await accountModel.findOne({
        where: { account_number: senderAccountNumber },
        transaction: t,
      });

      const receiver = await accountModel.findOne({
        where: { account_number: receiverAccountNumber },
        transaction: t,
      });

      if (!sender || !receiver) {
        throw new Error("Sender or receiver not found!");
      }
      // minimum criteria
      if (amount <= 50){
        res.send("meet the minimum criteria")
        throw new Error("Not enough funds to transfer. Minimum transfer amount is 50.");

      }

      // Create a transaction record
      const createTransfer = await transectionModel.create(
        {
          sender_account_number: sender.account_number,
          receiver_account_number: receiver.account_number,
          amount,
        }
      );

      // amount updation
      sender.amount -= amount;
      receiver.amount += amount;

      // save the updated to sender and receiver
      await sender.save({ transaction: t });
      await receiver.save({ transaction: t });

      // Commit the transaction--->un managed transections
    //   await t.commit();

      console.log("Transfer made!");
      res.status(200).json({ success: true, message: "Transfer made" });
    });
  } catch (error) {
    console.log("something wrong happened", error.message);
  }
}

module.exports = transection;
