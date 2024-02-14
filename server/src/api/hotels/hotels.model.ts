import { Schema, model } from 'mongoose';
import { IHotel } from '/types/hotel';
import { GeoJSONSchema } from '/lib/geojsonTools';

const HotelSchema = new Schema<IHotel>({
  city: String,
  postalZip: String,
  country: String,
  currency: Number,
  email: String,
  phone: String,
  lat: Number,
  long: Number,
  name: String,
  loc: {
    type: GeoJSONSchema(),
    index: "2dsphere", // Create a special 2dsphere index on `geoLocation`
  },
});

export default model('Hotel', HotelSchema);
