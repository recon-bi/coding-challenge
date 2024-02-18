import { Schema, model } from 'mongoose';
import AbstractController from '../AbstractController';
import mockingoose from 'mockingoose';
import { connectDBForTesting, disconnectDBForTesting } from 'lib/connectDBForTesting';

import mockModel from '../../../__mocks__/mockModel';
import { Request, Response } from 'express';

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
