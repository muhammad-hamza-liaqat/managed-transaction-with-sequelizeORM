const sequelize = require("../database/connection");
const accountModel = require("../model/accountModel");
const transectionModel = require("../model/transectionModel");

async function transection(req, res) {

  const { senderAccountNumber, receiverAccountNumber, amount } = req.body;

  try {
    if(!senderAccountNumber || !receiverAccountNumber || !amount) {
      console.log("senderAccountNumber||receiverAccountNumber ||amount is missing.");
    }
    // sender account number
    await sequelize.transaction(async (t) => {
      const sender = await accountModel.findOne({
        where: { account_number: senderAccountNumber },
        transaction: t,
      });
      // receiver account number
      const receiver = await accountModel.findOne({
        where: { account_number: receiverAccountNumber },
        transaction: t,
      });

      if (!sender || !receiver) {
        res.send("sender or receiver account number not entered!")
        // throw new Error("Sender or receiver not found!");
      }
      // minimum criteria
      if (amount <= 99){
        res.send("please meet the minimum criteria of sending amount->(gte:99)")
        throw new Error("Not enough funds to transfer. Minimum transfer amount is 99.");

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
      // balance updation after the transection is commit()
      console.log("Sender balance:" ,sender.amount)
      console.log("receiver balance:", receiver.amount)
    });
  } catch (error) {
    console.log("something wrong happened", error.message);
  }
}

module.exports = transection;
