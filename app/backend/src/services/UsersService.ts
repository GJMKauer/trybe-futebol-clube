import * as bcrypt from 'bcryptjs';
import * as Jwt from 'jsonwebtoken';
import { IToken, JwtUser } from '../interfaces/IToken';
import { IUser } from '../interfaces/IUser';
import UsersModel from '../database/models/UserModel';

const JWT_SECRET = process.env.JWT_SECRET || 'kozukioden';

class UserService {
  private model = UsersModel;

  public async login(email: string, password: string): Promise<IToken> {
    const user = await this.model.findOne({ where: { email }, raw: true }) as IUser;

    if (!bcrypt.compareSync(password, user.password)) {
      return null as unknown as IToken;
    }

    const token = Jwt.sign(
      { userId: user.id },
      JWT_SECRET,
      { algorithm: 'HS256', expiresIn: '1d' },
    );

    return token as unknown as IToken;
  }

  public async validate(userData: JwtUser) {
    const { userId } = userData;
    const user = await this.model.findOne({ where: { id: userId }, raw: true }) as IUser;

    return user.role;
  }
}

export default UserService;
