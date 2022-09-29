import { Model, DataTypes } from 'sequelize';
import db from '.';

import Team from './TeamModel';

class Match extends Model {
  id!: number;
  homeTeam!: number;
  homeTeamGoals!: number;
  awayTeam!: number;
  awayTeamsGoals!: number;
  inProgress!: number;
}

Match.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  homeTeam: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'home_team',
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'home_team_goals',
  },
  awayTeam: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'away_team',
  },
  awayTeamsGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'away_team_goals',
  },
  inProgress: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'in_progress',
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

Team.belongsToMany(Match, { foreignKey: 'home_team', as: 'homeTeam', through: 'matches' });
Team.belongsToMany(Match, { foreignKey: 'away_team', as: 'awayTeam', through: 'matches' });

Match.hasMany(Team, { foreignKey: 'home_team', as: 'homeTeam' });
Match.hasMany(Team, { foreignKey: 'away_team', as: 'awayTeam' });

export default Match;
