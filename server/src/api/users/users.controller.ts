import AbstractController from 'classes/AbstractController';
import model from './users.model';
import errorHandler from '/errorHandler';
import { Request, Response } from 'express';
import { UserType } from 'types/user';
import roles from 'constants/roles';
import bcrypt from 'bcrypt';

class UserController extends AbstractController {
  constructor() {
    super(model);
  }

  public createUser = async (req: Request<object, object, UserType>, res: Response) => {
    try {
      const password = await bcrypt.hash(req.body.password, 10);
      const newUser = { ...req.body, ...{ active: true, password } };
      const result = await this.model.create(newUser);
      return res.status(200).json(result);
    } catch (err) {
      return errorHandler(err, res);
    }
  };

  public getUser = async (req: Request<object, object, UserType>, res: Response) => {
    try {
      const { username } = req.body;
      const result = await this.model.findOne({ username }, { salt: 0, password: 0 });
      return res.status(200).json(result);
    } catch (err) {
      return errorHandler(err, res);
    }
  };

  public updateUser = async (req: Request<object, object, UserType>, res: Response) => {
    try {
      const { username } = req.body;
      const result = await this.model.updateOne({ username }, { $set: req.body });
      return res.status(200).json(result);
    } catch (err) {
      return errorHandler(err, res);
    }
  };

  public deleteUser = async (req: Request<UserType>, res: Response) => {
    try {
      const { username } = req.body;
      const result = await this.model.deleteOne({ username });
      return res.status(200).json(result);
    } catch (err) {
      return errorHandler(err, res);
    }
  };

  public getRoles = async (req: Request, res: Response) => {
    try {
      return res.status(200).json(roles);
    } catch (err) {
      return errorHandler(err, res);
    }
  };

  public resetPassword = async (req: Request, res: Response) => {
    try {
      return res.status(200).json(roles);
    } catch (err) {
      return errorHandler(err, res);
    }
  };
}

export default UserController;
