import { StatusCodes } from 'http-status-codes';
import Transaction from '../models/transactionModel.js';

//GET ALL TRANSACTIONS
export const getTransactions = async (req, res) => {
  const transactions = req.populatedTransactions; //{filter} --> only all matching
  res.status(StatusCodes.OK).json(transactions);
};

//CREATE NEW TRANSACTION
export const createTransaction = async (req, res) => {
  //Validation middleware missing still. Create that.
  const data = req.body;
  console.log(data);

  //We can eliminate try catch after we have validation!

  try {
    // Use object destructuring to directly pass the properties of data
    const newTransaction = await Transaction.create({ ...data });
    res.status(StatusCodes.OK).json({ newTransaction });
  } catch (error) {
    // Handle errors, perhaps send an error response
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: 'error', error: 'Internal Server Error' });
  }
};

//DELETE TRANSACTION

export const deleteTransactions = async (req, res) => {
  const { id } = req.params;
  const removedTransactions = await Transaction.findByIdAndDelete(id);

  res
    .status(StatusCodes.OK)
    .json({ msg: 'transaction deleted', transaction: removedTransactions });
};
