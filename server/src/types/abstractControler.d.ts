import { SchemaType } from 'mongoose';

export interface IAbstractController {
  model: SchemaType;
}
