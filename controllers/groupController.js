import { StatusCodes } from 'http-status-codes';
import Group from '../models/groupModel.js';

export const getGroupsWithUserId = async (req, res) => {
  try {
    const userId = req.params.id;

    // MongoDB query to find groups where the userId is in the members.userId array
    const groups = await Group.find({ 'members.userId': userId });

    res.status(StatusCodes.OK).json({ groups });
  } catch (error) {
    // Handle any errors that might occur during the database query
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

///// TÄMÄ ON KESKEN – VAIN KOPIO YLLÄOLEVASTA – MUTTA TÄSSÄ AJATUKSENA MIDDLEWREN KAUTTA PALAUTTAA GROUP-SIVULLE ISOMPI SETTI DATAA TIETYSTÄ RYHMÄSTÄ /////
export const getPopulatedGroupWithUserId = async (req, res) => {
  try {
    const userId = req.params.id;

    // MongoDB query to find groups where the userId is in the members.userId array
    const groups = await Group.find({ 'members.userId': userId });

    res.status(StatusCodes.OK).json({ groups });
  } catch (error) {
    // Handle any errors that might occur during the database query
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

export const createGroup = async (req, res) => {
  const data = req.body;
  console.log(data);

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