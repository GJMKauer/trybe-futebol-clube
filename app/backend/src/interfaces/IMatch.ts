import { ITeam } from './ITeam';

export interface IMatch {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: number;
  teamHome: ITeam;
  teamAway: ITeam;
}
