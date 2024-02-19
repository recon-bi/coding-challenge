import { Request, Response } from 'express';
import usersModel from '../users/users.model';
import bcrypt from 'bcrypt';
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import errorHandler from '/errorHandler';
import { IUserType } from '/types/user';
import { Model } from 'mongoose';

class AuthController {
  users: Model<IUserType>;

  constructor() {
    this.users = usersModel;
  }

  public login = async (req: Request<object, object, { username: string; password: string }>, res: Response) => {
    try {
      const { username, password } = req.body;
      const user = await this.users.findOne({ username });
      const { roles, personName, _id, email } = user;
      if (user) {
        const match = await bcrypt.compare(password, user.password);
        const accessToken = jwt.sign({ user }, process.env.APPLICATION_TOKEN_SECRET, { expiresIn: 1800 });

        if (match)
          return res.status(200).json({
            message: 'User authenticated successfully',
            data: { accessToken, user: { roles, personName, _id, username, email } },
          });
        else return errorHandler('Wrong password', res, 401, false);
      }
      return errorHandler('Username does not exist', res, 401, false);
    } catch (er) {
      return errorHandler(er, res);
    }
  };

  public logout = async (req, res) => {
    req.body;
    return res.status(200).json({ ok: true });
  };

  public changePassword = async (
    req: Request<object, object, { username: string; newPassword: string }>,
    res: Response,
  ) => {
    try {
      const { username, newPassword } = req.body;
      const password = await bcrypt.hash(newPassword, 10);
      const response = await this.users.updateOne({ username }, { $set: password });
      return res.send(200).json(response);
    } catch (er) {
      return errorHandler(er, res);
    }
  };

  public forgottenPassword = async () => {};

  public validateToken = (req: Request, res: Response) => {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader.split(' ')[1].replace(/"/g, '');
      jwt.verify(token, process.env.APPLICATION_TOKEN_SECRET);
      return res.status(200).json({ status: 'OK' });
    } catch (error) {
      if (error instanceof TokenExpiredError) return res.status(401).json({ message: 'Token Expired' });
      return errorHandler(error, res);
    }
  };
}

export default AuthController;
