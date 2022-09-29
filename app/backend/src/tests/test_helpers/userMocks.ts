import * as bcrypt from 'bcryptjs';
import * as Jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../helpers';

const validUser = {
  email: 'kozukioden@wano.com',
  password: bcrypt.hashSync('luffyreidospiratas'),
};

const validUserDecoded = {
  email: 'kozukioden@wano.com',
  password: 'luffyreidospiratas',
}

const invalidUser = {
  email: 'kurozumiorochi@wano.com',
  password: 'kaidouomaisdaora',
}

const userWithoutEmail = {
  password: 'roronoazorodiz:cademeuemail',
}

const userWithoutPassword = {
  password: 'roronoazorodiz:cademinhasenha',
}

const userRole = {
  email: 'kozukioden@wano.com',
  password: 'luffyreidospiratas',
  role: 'bestswordsman',
}

const userToken = Jwt.sign(
  { userEmail: validUserDecoded.email },
  JWT_SECRET,
  { algorithm: 'HS256', expiresIn: '1d' },
);

const invalidUserToken = 'roronoazorodiz:cademeutoken'

export {
  validUser,
  validUserDecoded,
  invalidUser,
  userWithoutEmail,
  userWithoutPassword,
  userRole,
  userToken,
  invalidUserToken,
};