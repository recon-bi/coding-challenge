import { Schema, model } from 'mongoose';
import { IUserType } from 'types/user';

const UserSchema = new Schema<IUserType>({
  username: String,
  password: String,
  personName: String,
  email: String,
  phone: String,
  roles: [],
  active: Boolean,
});

const User = model('User', UserSchema);

export default User;
