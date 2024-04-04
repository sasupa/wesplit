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

// Method to add a user to the group
GroupSchema.methods.addMember = async function(userId) {
  // Check if the user is already a member
  const isAlreadyMember = this.members.some(member =>
    member.userId.equals(userId)
  );

  if (!isAlreadyMember) {
    // Add the user to the members array
    this.members.push({ userId: userId, balance: "0.00" });
    await this.save(); // Save the document with the new member added
    return { success: true, message: "User added to group successfully" };
  } else {
    // User is already a member, do not add again
    return { success: false, message: "User is already a member of the group" };
  }
};

// Method to remove a user from the group
GroupSchema.methods.removeMember = async function(userId) {
  // Check if the user is a member to be able to remove
  const memberIndex = this.members.findIndex(member =>
    member.userId.equals(userId)
  );

  if (memberIndex !== -1) {
    // User is found, remove them from the members array
    this.members.splice(memberIndex, 1);
    await this.save(); // Save the document with the member removed
    return { success: true, message: "User removed from group successfully" };
  } else {
    // User is not a member, so can't be removed
    return { success: false, message: "User is not a member of the group" };
  }
};

export default mongoose.model("Group", GroupSchema);
