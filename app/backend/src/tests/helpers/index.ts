import * as bcrypt from 'bcryptjs';

const STATUS_CODES = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
}

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


export {
  STATUS_CODES,
  validUser,
  validUserDecoded,
  invalidUser,
  userWithoutEmail,
  userWithoutPassword,
};