import { Schema, model } from 'mongoose';
import { IExample } from '/types/example';

const ExampleSchema = new Schema<IExample>({
  totalPrice: {
    type: Number,
    required: true,
  },
  customerName: String,
  phone: String,
  email: String,
});

export default model('Example', ExampleSchema);
