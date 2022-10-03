import { IToken, JwtUser } from '../interfaces/IToken';
import { IUser } from '../interfaces/IUser';
import UserModel from '../database/models/UserModel';
import bCryptValidation from '../helpers/bCryptPasswordValidation';
import tokenGenerate from '../helpers/JWTGenerator';

class UserService {
  private model = UserModel;

  public async login(email: string, password: string): Promise<IToken> {
    const user = await this.model.findOne({ where: { email }, raw: true }) as IUser;

    if (!bCryptValidation(password, user.password)) {
      return null as unknown as IToken;
    }

    const token = tokenGenerate(user);

    return token as unknown as IToken;
  }

  public async validate(userData: JwtUser): Promise<string> {
    const { userId } = userData;
    const user = await this.model.findOne({ where: { id: userId }, raw: true }) as IUser;

    return user.role;
  }
}

export default UserService;
