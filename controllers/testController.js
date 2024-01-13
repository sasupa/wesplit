import { StatusCodes } from 'http-status-codes';
import Transaction from '../models/transactionModel.js';

export const getTested = async (req, res) => {
  const message = 'first request through';

  res.status(StatusCodes.OK).json({ message });
};
export const getTransactions = async (req, res) => {
  const users = await User.find({}); //{filter} --> only all matching
  res.status(StatusCodes.OK).json({ users });
};

export const createTransaction = async (req, res) => {
  const data = req.body;
  console.log(data);

  try {
    // Use object destructuring to directly pass the properties of data
    const newTransaction = await Transaction.create({ ...data });

    res.status(StatusCodes.OK).json({ msg: 'okay', data: newTransaction });
  } catch (error) {
    // Handle errors, perhaps send an error response
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: 'error', error: 'Internal Server Error' });
  }
};
