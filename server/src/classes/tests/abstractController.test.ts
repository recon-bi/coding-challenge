// abstractController.test.js

import AbstractController from '../AbstractController';
import { Request, Response } from 'express';

// Mock Mongoose model
const mockModel = {
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  bulkWrite: jest.fn(),
  updateOne: jest.fn(),
  aggregate: jest.fn(),
};

const mockController = {
  find: jest.fn(),
  findOne: jest.fn()
}

describe('AbstractController', () => {
  let abstractController;
  let req;
  let res;

  beforeEach(() => {
    abstractController = new AbstractController(mockModel);
    req = { params: {} };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    test('should return status 200 with results', async () => {
      mockModel.find.mockResolvedValueOnce(['result1', 'result2']);

      await abstractController.getAll(req as Request, res as unknown as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(['result1', 'result2']);
    });

    // Add more test cases for error handling, etc.
  });

  describe('find method', () => {
    it('should return items based on query', async () => {
      req.query = { query: JSON.stringify({ name: 'test' }) };
      mockModel.find.mockResolvedValue(['item1']);
      await mockController.find(req, res);

      expect(mockModel.find).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(['item1']);
    });
  });

  describe('findOne method', () => {
    it('should return a single item by id', async () => {
      const _id = 'someId';
      req.params.id = _id;
      mockModel.findOne.mockResolvedValue({ _id, name: 'testItem' });
      await mockController.findOne(req, res);

      expect(mockModel.findOne).toHaveBeenCalledWith({ _id });
      expect(mockModel.findOne).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ _id, name: 'testItem' });
    });
  });


  // Write similar test cases for other methods like find, findOne, createOne, etc.
});