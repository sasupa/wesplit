import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema(
  {
    description: String,
    amount: mongoose.Types.Decimal128,
    divisionType: {
      type: String,
      enum: ['split equally', 'manual division', 'checkout'],
    },
    creator: mongoose.Types.ObjectId,
    payer: mongoose.Types.ObjectId,
    shares: [
      {
        shareholderId: mongoose.Types.ObjectId,
        share: mongoose.Types.Decimal128,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model('Transaction', TransactionSchema);
