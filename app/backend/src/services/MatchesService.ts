import TeamModel from '../database/models/TeamModel';
import MatchModel from '../database/models/MatchModel';
import { IMatch } from '../interfaces/IMatch';

class MatchesService {
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

    return team as unknown as IMatch[];
  }

  public async getMatchesByProgress(q: boolean): Promise<IMatch[]> {
    const team = await this.model.findAll({
      where: { inProgress: q },
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

    return team as unknown as IMatch[];
  }

  public async addNewMatch(matchArgs: object): Promise<IMatch> {
    const newMatch = await this.model.create(matchArgs);

    return newMatch as unknown as IMatch;
  }

  public async finishMatch(id: string) {
    const match = await this.model.findOne({ where: { id } });

    const updatedMatch = await match?.update({ inProgress: false });

    return updatedMatch;
  }
}

export default MatchesService;
