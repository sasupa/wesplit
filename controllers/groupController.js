import { StatusCodes } from "http-status-codes";
import Group from "../models/groupModel.js";

export const getGroupsWithUserId = async (req, res) => {
  const groups = req.populatedGroups; // Use the populated group from the middleware
  //console.log(groups);
  res.status(StatusCodes.OK).json({ groups });
};

export const getPopulatedGroupWithGroupId = async (req, res) => {
  const group = req.populatedGroup; // Use the populated group from the middleware
  //console.log(group);
  res.status(StatusCodes.OK).json({ group });
};

export const createGroup = async (req, res) => {
  const data = req.body;
  // console.log(data);

  try {
    // Use object destructuring to directly pass the properties of data
    const newGroup = await Group.create({ ...data });

    res.status(StatusCodes.OK).json({ msg: "okay", data: newGroup });
  } catch (error) {
    // Handle errors, perhaps send an error response
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "error", error: "Internal Server Error" });
  }
};

// Function to add a user to an existing group
export const addUserToGroup = async (req, res) => {
  const { groupId, userId } = req.body; // Assuming the request includes the group ID and user ID

  try {
    // Fetch the group by ID
    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "Group not found" });
    }

    // Assuming the Group model has a method to add a user (adjust based on your setup)
    // This could involve pushing the userId into an array of userIds in the group
    // or creating a new entry in a join table for many-to-many relationships
    await group.addMember(userId);
    // Use populate to get user details along with populated transactions
    const newGroup = await Group.findById(groupId)
      .populate("admins")
      .populate("invitedMembers")
      .populate("members.userId")
      .populate("transactions")
      .populate("transactions.payer");

    // Optionally, return the updated group or a success message
    res
      .status(StatusCodes.OK)
      .json({ msg: "User added to group successfully", data: newGroup });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "error", error: "Internal Server Error" });
  }
};

// Function to add a user to an existing group
export const removeMemberFromGroup = async (req, res) => {
  const { groupId, userId } = req.body; // Assuming the request includes the group ID and user ID

  try {
    // Fetch the group by ID
    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "Group not found" });
    }

    // Assuming the Group model has a method to add a user (adjust based on your setup)
    // This could involve pushing the userId into an array of userIds in the group
    // or creating a new entry in a join table for many-to-many relationships
    await group.removeMember(userId);
    // Use populate to get user details along with populated transactions
    const newGroup = await Group.findById(groupId)
      .populate("admins")
      .populate("invitedMembers")
      .populate("members.userId")
      .populate("transactions")
      .populate("transactions.payer");

    // Optionally, return the updated group or a success message
    res
      .status(StatusCodes.OK)
      .json({ msg: "Member removed successfully", data: newGroup });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "error", error: "Internal Server Error" });
  }
};
