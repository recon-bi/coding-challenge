import { Document, Model } from 'mongoose';

export interface IUserDocument extends IUserType, Document {}

export interface IUserModel extends Model<IUserDocument> {
  buildUser(args: IUser): IUserDocument;
}
