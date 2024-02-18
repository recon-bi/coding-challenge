import { Schema, model } from 'mongoose';

const mockSchema = new Schema({
  testString: String,
  testNumber: Number,
});

export default model('mockSchema', mockSchema);
