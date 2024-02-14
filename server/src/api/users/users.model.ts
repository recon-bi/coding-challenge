import { Schema, model } from 'mongoose';
import { UserType, IUserDocument, IUserModel } from 'types/user';

const UserSchema = new Schema<IUserDocument>({
  username: String,
  password: String,
  personName: String,
  email: String,
  phone: String,
  roles: [],
  active: Boolean,
});

UserSchema.statics.buildUser = (args: UserType) => {
  return new User(args);
};

const User = model<IUserDocument, IUserModel>('User', UserSchema);

export default User;
