import * as Jwt from 'jsonwebtoken';
import { IUser } from '../interfaces/IUser';
import { JWT_SECRET } from '.';

const tokenGenerate = (user: IUser) => {
  const token = Jwt.sign(
    { userId: user.id },
    JWT_SECRET,
    { algorithm: 'HS256', expiresIn: '1d' },
  );

  return token;
};

export default tokenGenerate;
