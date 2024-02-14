import { Request, Response } from 'express';
import AbstractController from '../../classes/AbstractController';
import model from './bookings.model';
import errorHandler from '/errorHandler';

class BookingController extends AbstractController {
  constructor() {
    super(model);
  }

  public create = async (req: Request, res: Response) => {
    const user =  {
      _id: '65ccc622ef7fd3d7bd0604c6',
      username: 'User1',
      roles: [],
      personName: 'John Smith',
      email: 'john@smith.com',
      phone: '666 666 6666',
      active: true,
      password: '$2b$10$b5Lmg/DkEJNloIyHGuTSaOemYCvPi2bmGUhj0YggcJLECiPwZ4UU.'
    }
    const newDoc = { ...req.body, ...{ user } }
    try {
      const response = await this.model.create(newDoc);
      return res.status(200).json(response);
    } catch (err) {
      return errorHandler(err, res);
    }
  };
}

export default BookingController;
