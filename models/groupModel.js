// Group model

import mongoose from "mongoose";

const GroupSchema = new mongoose.Schema({
  name: String,
  admins: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  members: [
    {
      userId: { type: mongoose.Types.ObjectId, ref: "User" },
      balance: { type: String, default: "0.00" },
    },
  ],
  invitedMembers: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  transactions: [{ type: mongoose.Types.ObjectId, ref: "Transaction" }],
});

export default mongoose.model("Group", GroupSchema);
