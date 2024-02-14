import { Schema, model } from "mongoose";
import { IBooking } from "/types/bookings";

const BookingSchema = new Schema<IBooking>({
  hotel: {
    type: Object,
    required: true
  },
  user: {
    type: Object,
    required: true
  },
  checkIn: {
    type: Date,
    required: true
  },
  checkOut: {
    type: Date,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  customerName: String,
  phone: String,
  email: String
});

export default model("Booking", BookingSchema);
