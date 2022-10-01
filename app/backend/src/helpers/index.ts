// Secret key
const JWT_SECRET = 'jwt_secret';

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
const notFoundMatch = 'Match not found';

// LeaderboardHome validations
const sumPointsHome = `SUM(home_team_goals > away_team_goals) * 3 
+ SUM(home_team_goals = away_team_goals)`;
const convertEfficiencyHome = `CONVERT(((SUM(home_team_goals > away_team_goals) * 3) 
+ SUM(home_team_goals = away_team_goals)) / (COUNT(home_team) * 3) * 100, DECIMAL(10,2))`;

// LeaderboardAway validations
const sumPointsAway = `SUM(away_team_goals > home_team_goals) * 3 
+ SUM(away_team_goals = home_team_goals)`;
const convertEfficiencyAway = `CONVERT(((SUM(away_team_goals > home_team_goals) * 3) 
+ SUM(away_team_goals = home_team_goals)) / (COUNT(home_team) * 3) * 100, DECIMAL(10,2))`;

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
  notFoundMatch,
  sumPointsHome,
  convertEfficiencyHome,
  sumPointsAway,
  convertEfficiencyAway,
};
