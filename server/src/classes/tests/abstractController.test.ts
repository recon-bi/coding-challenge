import AbstractController from '../AbstractController';
import mockModel from '../../../__mocks__/mockModel';
import { Request } from 'express';

// let mockModel: any = null;
// let mockSchema: any = null;

type mockBodyType = {
  name: string;
  num: number;
  obj: {
    prop: string;
  };
};

const req: Request<object, object, mockBodyType, object> = {
  body: {
    name: 'Test',
    num: 0,
    obj: {
      prop: 'obj prop',
    },
  },
};

const res = () => {
  return {
    status: 201,
    json: jest.fn(),
  };
};

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
