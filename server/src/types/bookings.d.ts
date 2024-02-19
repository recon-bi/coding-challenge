import { IHotel } from '/types/hotel';
import { IUserDocument } from '/types/user';

export interface IBooking extends Document {
  hotel: IHotel;
  user: IUserDocument;
  checkIn: Date;
  checkOut: Date;
  duration: number;
  totalPrice: number;
  customerName: string;
  phone: string;
  email: string;
}
