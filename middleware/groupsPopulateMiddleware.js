import Group from "../models/groupModel.js";

export const groupsPopulateMiddleware = async (req, res, next) => {
  try {
    const userId = req.params.id;

    // MongoDB query to find groups where the userId is in the members.userId array
    const groups = await Group.find({ "members.userId": userId })
      .populate("admins")
      .populate("invitedMembers")
      .populate("members.userId")
      .populate("transactions");

    req.populatedGroups = groups; // Attach the user with transactions to the request object
    next();
  } catch (error) {
    // Handle any errors that might occur during the database query
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};