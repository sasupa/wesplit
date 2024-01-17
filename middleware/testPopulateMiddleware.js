import User from '../models/userModel.js';

export const populateActivityMiddleware = async (req, res, next) => {
  try {
    const userId = '65a7f98cf94114267cda436e';

    // Use populate to get user details along with populated transactions
    const user = await User.findById(userId).populate('activity');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.userWithTransactions = user; // Attach the user with transactions to the request object
    next();
  } catch (error) {
    console.error('Error populating transactions:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
