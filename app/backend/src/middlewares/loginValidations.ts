// import * as bcrypt from 'bcryptjs';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserModel from '../database/models/UserModel';
import UsersService from '../services/UsersService';
import { IUser } from '../interfaces/IUser';
import { invalidData, unfilledData, incorrectData } from '../helpers';

class LoginValidation {
  private model = UserModel;
  constructor(private usersService = new UsersService()) { }

  public loginV = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: unfilledData });
    }

    const user = await this.model.findOne({ where: { email }, raw: true }) as IUser;

    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: incorrectData });
    }

    const token = await this.usersService.login(email, password);

    if (!token) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: invalidData });
    }

    // if (!bcrypt.compareSync(password, user.password)) {
    //   throw new Error('INVALID DATA');
    // }

    next();
  };
}

export default LoginValidation;
