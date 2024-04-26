import { StatusCodes } from "http-status-codes";
import Transaction from "../models/transactionModel.js";
import Group from "../models/groupModel.js";

//GET ALL TRANSACTIONS
export const getTransactions = async (req, res) => {
  const transactions = req.populatedTransactions; //{filter} --> only all matching
  res.status(StatusCodes.OK).json(transactions);
};

//CREATE NEW TRANSACTION & UPDATE GROUP BALANCES
export const createTransaction = async (req, res) => {
  // Destructure
  const data = req.body;

  // Use object destructuring to directly pass the properties of data
  const newTransaction = await Transaction.create({ ...data });
  console.log(newTransaction);

  // Fetch the group and its current balances
  const group = await Group.findById(data.group);

  // Update balances based on shares
  data.shares.forEach((share, index) => {
    const memberIndex = group.members.findIndex(
      (member) => member.userId.toString() === share.shareholderId
    );

    if (memberIndex !== -1) {
      // Check if user is they payer >> balance calc
      let paidAmount = parseFloat(0);
      if (share.shareholderId === data.payer) {
        paidAmount = parseFloat(data.amount);
      }

      // Update balance for each member
      group.members[memberIndex].balance =
        parseFloat(group.members[memberIndex].balance) +
        (paidAmount - parseFloat(share.share));
    }
  });

  // Update group transaction list
  group.transactions.push(newTransaction._id);

  // Save the updated group
  const updatedGroup = await group.save();
  console.log(updatedGroup); // For debugging

  // let frontend know we've succeeded 👍
  res.status(StatusCodes.OK).json({ newTransaction });
};

//DELETE TRANSACTION

export const deleteTransactions = async (req, res) => {
  const { id } = req.params;
  const removedTransactions = await Transaction.findByIdAndDelete(id);

  res
    .status(StatusCodes.OK)
    .json({ msg: "transaction deleted", transaction: removedTransactions });
};
