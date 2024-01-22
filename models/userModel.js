// User model

import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  tel: String,
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

UserSchema.methods.toJSON = function () {
  let obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model('User', UserSchema);
