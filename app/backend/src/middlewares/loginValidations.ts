import { Request, Response, NextFunction } from 'express';
// import * as bcrypt from 'bcryptjs';
import { IUser } from '../interfaces/IUser';
import UsersModel from '../database/models/UserModel';
import { unfilledData, incorrectData } from '../helpers';

class LoginValidation {
  private model = UsersModel;

  public loginV = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: unfilledData });
    }

    const user = await this.model.findOne({ where: { email }, raw: true }) as IUser;
    console.log('USUÁRIO', user);

    if (!user) {
      return res.status(401).json({ message: incorrectData });
    }

    // if (!bcrypt.compareSync(password, user.password)) {
    //   throw new Error('INVALID DATA');
    // }

    next();
  };
}

export default LoginValidation;
