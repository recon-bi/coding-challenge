import AbstractController from '../AbstractController';

import { Request, Response } from 'express';
import mockModel from '../../../__mocks__/mockModel';

// let mockModel: any = null;
// let mockSchema: any = null;

const req: Request = jest.fn();
const res: Response = jest.fn();

// beforeEach(() => {
//   mockSchema = new Schema({
//     testString: String,
//     testNumber: Number,
//   });

//   mockModel = model('mockModel', mockSchema);
//   // mockingoose(mockModel).toReturn([{ testName: 'Name ' }]);
// });

// afterEach(() => {
//   mockSchema = null;
//   mockModel = null;
// });

describe('AbstractController', () => {
  it('should instantiate with a this.model passed in constructor', () => {
    const controller = new AbstractController(mockModel);
    expect(controller.model).toEqual(mockModel);
  });

  it('should instantiate with a this.model passed in constructor', () => {
    const controller = new AbstractController(mockModel);

    const test = controller.createMany(req, res);
    console.log(test);
  });
});
