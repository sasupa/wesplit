import Group from "../models/groupModel.js";

export const groupPopulateMiddleware = async (req, res, next) => {
  try {
    //const groupId = '65a81c8d7f34d3d8aab7f1fd';
    const groupId = req.params.id;

    // Use populate to get user details along with populated transactions
    const group = await Group.findById(groupId)
      .populate("admins")
      .populate("invitedMembers")
      .populate("members.userId")
      .populate("transactions")
      .populate("transactions.payer");

    if (!group) {
      return res.status(404).json({ message: "Group NOT found" });
    }

    req.populatedGroup = group; // Attach the user with transactions to the request object
    next();
  } catch (error) {
    console.error("Error populating group:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
