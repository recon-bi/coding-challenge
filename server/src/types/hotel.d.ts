import { Geometry } from 'geojson';

export interface IHotel extends Document {
  city: string;
  postalZip: string;
  country: string;
  currency: number;
  email: string;
  phone: string;
  lat: number;
  long: number;
  name: string;
  loc: Geometry;
}
