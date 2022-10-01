import { StatusCodes } from 'http-status-codes';
import * as Jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { JwtUser } from '../interfaces/IToken';
import UserService from '../services/UserService';
import { JWT_SECRET, notFoundToken } from '../helpers';

class UsersController {
  constructor(private userService = new UserService()) { }

  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const token = await this.userService.login(email, password);

    return res.status(StatusCodes.OK).json({ token });
  };

  public validate = async (req: Request, res: Response) => {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: notFoundToken });
    }

    const newAuthorization = authorization.replace('Bearer ', '');

    const userData = Jwt.verify(newAuthorization as string, JWT_SECRET);

    const role = await this.userService.validate(userData as JwtUser);

    return res.status(StatusCodes.OK).json({ role });
  };
}

export default UsersController;
