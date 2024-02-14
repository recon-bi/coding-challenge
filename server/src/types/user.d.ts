import { Document, Model } from 'mongoose';

export type UserType = {
  username: string;
  password: string;
  roles: {
    type: string[];
    default: [];
  };
  personName?: string;
  email: string;
  phone?: string;
  active?: boolean;
};

export interface IUserDocument extends UserType, Document {}

export interface IUserModel extends Model<IUserDocument> {
  buildUser(args: IUser): IUserDocument;
}
