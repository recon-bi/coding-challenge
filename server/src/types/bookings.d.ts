import { IHotel } from "/types/hotel";
import { IUserDocument } from "/types/user";

export interface IBooking {
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