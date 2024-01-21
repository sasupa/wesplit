import { StatusCodes } from 'http-status-codes';
import Group from '../models/groupModel.js';

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

    res.status(StatusCodes.OK).json({ msg: 'okay', data: newGroup });
  } catch (error) {
    // Handle errors, perhaps send an error response
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: 'error', error: 'Internal Server Error' });
  }
};
