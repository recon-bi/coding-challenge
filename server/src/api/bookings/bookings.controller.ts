import { Request, Response } from 'express';
import AbstractController from '../../classes/AbstractController';
import model from './bookings.model';
import errorHandler from '/errorHandler';
import { IBooking } from '/types/bookings';

class BookingController extends AbstractController<IBooking> {
  constructor() {
    super(model);
  }

  public create = async (req: Request, res: Response) => {
    const newDoc = { ...req.body };
    try {
      const response = await this.model.create(newDoc);
      return res.status(200).json(response);
    } catch (error) {
      return errorHandler(error, res);
    }
  };

  public getMine = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const response = await this.model.find({ 'user._id': id });
      console.log(response);
      return res.status(200).json(response);
    } catch (error) {
      return errorHandler(error, res);
    }
  };
}

export default BookingController;
