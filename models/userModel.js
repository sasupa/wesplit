// User model

import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  lastName: {
    type: String,
    default: 'lastName',
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  activity: [{ type: mongoose.Types.ObjectId, ref: 'Transaction' }],
});

export default mongoose.model('User', UserSchema);