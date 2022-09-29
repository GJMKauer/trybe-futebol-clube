import { StatusCodes } from 'http-status-codes';
import * as Jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { JwtUser } from '../interfaces/IToken';
import UsersService from '../services/UsersService';
import { JWT_SECRET } from '../helpers';

class UsersController {
  constructor(private usersService = new UsersService()) { }

  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const token = await this.usersService.login(email, password);

    return res.status(StatusCodes.OK).json({ token });
  };

  public validate = async (req: Request, res: Response) => {
    const { authorization } = req.headers;

    const newAuthorization = authorization?.replace('Bearer ', '');

    const userData = Jwt.verify(newAuthorization as string, JWT_SECRET);

    const role = await this.usersService.validate(userData as JwtUser);

    return res.status(StatusCodes.OK).json({ role });
  };
}

export default UsersController;
