// import { Request, Response, NextFunction } from 'express';
// import * as bcrypt from 'bcryptjs';
// import { IUser } from '../interfaces/IUser';
// import UsersModel from '../database/models/UserModel';

// class LoginValidation {
//   private model = UsersModel;

//   public loginV = async (req: Request, res: Response, next: NextFunction) => {
//     const { email, password } = req.body;

//     const result = await this.model.findOne({ where: { email }, raw: true }) as IUser;

//     if (!bcrypt.compareSync(password, result.password)) {
//       throw new Error('INVALID DATA');
//     }

//     next();
//   };
// }

// export default LoginValidation;
