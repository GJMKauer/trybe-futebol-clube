import TeamModel from '../database/models/TeamModel';
import MatchModel from '../database/models/MatchModel';
import { IMatch } from '../interfaces/IMatch';

class MatchService {
  private model = MatchModel;

  public async getAllMatches(): Promise<IMatch[]> {
    const team = await this.model.findAll({
      include: [{
        model: TeamModel,
        as: 'teamHome',
        attributes: ['teamName'],
      },
      {
        model: TeamModel,
        as: 'teamAway',
        attributes: ['teamName'],
      }],
    });

    return team as IMatch[];
  }

  public async getMatchesByProgress(inProgress: boolean): Promise<IMatch[]> {
    const team = await this.model.findAll({
      where: { inProgress },
      include: [{
        model: TeamModel,
        as: 'teamHome',
        attributes: ['teamName'],
      },
      {
        model: TeamModel,
        as: 'teamAway',
        attributes: ['teamName'],
      }],
    });

    return team as IMatch[];
  }

  public async addNewMatch(matchArgs: object): Promise<IMatch> {
    const newMatch = await this.model.create(matchArgs);

    return newMatch as IMatch;
  }

  public async finishMatch(id: string): Promise<IMatch | null> {
    const match = await this.model.findByPk(id);

    if (!match) {
      return null;
    }

    const finishedMatch = await match.update({ inProgress: false });

    return finishedMatch;
  }

  public async updateMatch(id: string, homeTeamGoals: number, awayTeamGoals: number)
    : Promise<IMatch | null> {
    const matchToBeUpdated = await this.model.findByPk(id);

    if (!matchToBeUpdated) {
      return null;
    }

    const updatedMatch = await matchToBeUpdated.update({ homeTeamGoals, awayTeamGoals });

    return updatedMatch;
  }
}

export default MatchService;
