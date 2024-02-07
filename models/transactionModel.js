import mongoose from 'mongoose';

const { Schema } = mongoose;

const TransactionSchema = new Schema(
  {
    description: String,
    amount: mongoose.Types.Decimal128,
    divisionType: {
      type: String,
      enum: ['split equally', 'manual division', 'checkout'],
    },
    group: { type: Schema.Types.ObjectId, ref: 'Group' },
    creator: { type: Schema.Types.ObjectId, ref: 'User' }, //Debug: used to be mongoose.Types.ObjectId
    payer: { type: Schema.Types.ObjectId, ref: 'User' },
    shares: [
      {
        shareholderId: { type: Schema.Types.ObjectId, ref: 'User' }, // Debug
        share: mongoose.Types.Decimal128,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model('Transaction', TransactionSchema);
