const allMatches = [
  {
    id: 1,
    homeTeam: 1,
    homeTeamGoals: 2,
    awayTeam: 2,
    awayTeamGoals: 0,
    inProgress: false,
    teamHome: {
      teamName: 'Luffy'
    },
    teamAway: {
      teamName: 'Usopp'
    }
  },
  {
    id: 2,
    homeTeam: 1,
    homeTeamGoals: 0,
    awayTeam: 3,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: {
      teamName: 'Luffy'
    },
    teamAway: {
      teamName: 'Sanji'
    }
  },
  {
    id: 3,
    homeTeam: 1,
    homeTeamGoals: 2,
    awayTeam: 4,
    awayTeamGoals: 1,
    inProgress: true,
    teamHome: {
      teamName: 'Luffy'
    },
    teamAway: {
      teamName: 'Katakuri'
    }
  }
];

const inProgressMatches = [
  {
    id: 3,
    homeTeam: 1,
    homeTeamGoals: 2,
    awayTeam: 4,
    awayTeamGoals: 1,
    inProgress: true,
    teamHome: {
      teamName: 'Luffy'
    },
    teamAway: {
      teamName: 'Katakuri'
    }
  }
];

const notInProgressMatches = [
  {
    id: 1,
    homeTeam: 1,
    homeTeamGoals: 2,
    awayTeam: 2,
    awayTeamGoals: 0,
    inProgress: false,
    teamHome: {
      teamName: 'Luffy'
    },
    teamAway: {
      teamName: 'Usopp'
    }
  },
  {
    id: 2,
    homeTeam: 1,
    homeTeamGoals: 0,
    awayTeam: 3,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: {
      teamName: 'Luffy'
    },
    teamAway: {
      teamName: 'Sanji'
    }
  }
];

const newMatch = {
  homeTeam: 1,
  homeTeamGoals: 1,
  awayTeam: 3,
  awayTeamGoals: 4,
};

const actualUpdatedMatch = {
  id: 3,
  homeTeam: 4,
  homeTeamGoals: 10,
  awayTeam: 11,
  awayTeamGoals: 5,
  inProgress: false,
}

const validUserDatabase = {
  email: 'admin@admin.com',
  password: 'secret_admin',
}

const newMatchEqualTeams = {
  homeTeam: 1,
  homeTeamGoals: 1,
  awayTeam: 1,
  awayTeamGoals: 4,
}

const newMatchNonExistentTeams = {
  homeTeam: 99,
  homeTeamGoals: 1,
  awayTeam: 82,
  awayTeamGoals: 4,
}

export {
  allMatches,
  inProgressMatches,
  notInProgressMatches,
  newMatch,
  actualUpdatedMatch,
  validUserDatabase,
  newMatchEqualTeams,
  newMatchNonExistentTeams,
};