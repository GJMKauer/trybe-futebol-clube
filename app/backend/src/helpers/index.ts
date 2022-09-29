// Secret key
const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';

// Login validations
const invalidData = 'Invalid data';
const unfilledData = 'All fields must be filled';
const incorrectData = 'Incorrect email or password';
const notFoundToken = 'You need a token to access this route';

// Match validations
const finishedMatch = 'Finished';
const equalTeams = 'It is not possible to create a match with two equal teams';
const invalidTeams = 'There is no team with such id!';
const invalidToken = 'Token must be a valid token';

export {
  JWT_SECRET,
  invalidData,
  unfilledData,
  incorrectData,
  notFoundToken,
  finishedMatch,
  equalTeams,
  invalidTeams,
  invalidToken,
};
