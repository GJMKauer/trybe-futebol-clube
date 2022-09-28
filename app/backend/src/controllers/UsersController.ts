import { Request, Response } from 'express';
import UsersService from '../services/UsersService';

class UsersController {
  constructor(private usersService = new UsersService()) { }

  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const token = await this.usersService.login(email, password);

    if (!token) {
      return res.status(401).json({ message: 'Invalid data' });
    }

    return res.status(200).json({ token });
  };
}

export default UsersController;
