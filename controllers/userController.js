import { StatusCodes } from 'http-status-codes';
import User from '../models/userModel.js';

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  res.status(StatusCodes.OK).json({ user });
};
