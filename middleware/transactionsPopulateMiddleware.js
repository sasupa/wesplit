//import { Transaction } from 'mongodb';
import Transaction from '../models/transactionModel.js';

export const transactionsPopulateMiddleware = async (req, res, next) => {
  //Example fields

  const transactions = await Transaction.find({})
    .populate('creator', 'name lastName') // populated field, selected attributes to populate with
    .populate('payer', 'name email')
    .populate('shares.shareholderId', 'name lastName');

  req.populatedTransactions = transactions; // Attach the user with transactions to the request object
  console.log(transactions);
  next();
};
