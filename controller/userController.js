const sequelize = require("../database/connection");
const accountModel = require("../model/accountModel");
const transectionModel = require("../model/transectionModel");

async function transection(req, res) {
  const { senderAccountNumber, receiverAccountNumber, amount } = req.body;

  try {
    if (!senderAccountNumber || !receiverAccountNumber || !amount) {
      throw new Error('All fields are required');
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
      if (sender.amount<0){
        throw new Error("not sufficient balance!")
      }

      // Create a transaction record
      const createTransfer = await transectionModel.create(
        {
          sender_account_number: sender.account_number,
          receiver_account_number: receiver.account_number,
          amount,
        //   transection_id: "009",
        }
      );

      // amount updation
      sender.amount -= amount;
      receiver.amount += amount;

      // save the updated to sender and receiver
      await sender.save({ transaction: t });
      await receiver.save({ transaction: t });

      // Commit the transaction--->managed transections
    //   await t.commit();

      console.log("Transfer made!");
      res.status(200).json({ success: true, message: "Transfer made" });
    });
  } catch (error) {
    console.log("Error in transfer:", error.message);
    // res.status(500).json({ success: false, message: "Error during transfer" });
  }
}

module.exports = transection;
