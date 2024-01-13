import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema(
  {
    description: String,
    amount: mongoose.Types.Decimal128,
    divisionType: {
      type: String,
      enum: ['Paid by you and split equally', 'manual sum split'], //Needs update
    },
    creator: mongoose.Types.ObjectId,
  },
  { timestamps: true } //adds createdAt, updatedAt...);
);

export default mongoose.model('Transaction', TransactionSchema);
