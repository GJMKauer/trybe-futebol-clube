import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserModel from '../database/models/UserModel';
import UserService from '../services/UserService';
import { IUser } from '../interfaces/IUser';
import { invalidData, unfilledData, incorrectData } from '../helpers';

class LoginValidation {
  private model = UserModel;
  constructor(private userService = new UserService()) { }

  public loginV = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: unfilledData });
    }

    const user = await this.model.findOne({ where: { email }, raw: true }) as IUser;

    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: incorrectData });
    }

    const token = await this.userService.login(email, password);

    if (!token) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: invalidData });
    }

    next();
  };
}

export default LoginValidation;
