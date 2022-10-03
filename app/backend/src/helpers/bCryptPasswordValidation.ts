import * as bcrypt from 'bcryptjs';

const bCryptPasswordValidation = (password: string, hash: string): boolean =>
  bcrypt.compareSync(password, hash);

export default bCryptPasswordValidation;
