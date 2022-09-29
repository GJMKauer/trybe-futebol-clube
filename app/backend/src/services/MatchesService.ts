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

    console.log('TIME AQUI', team);

    return team as unknown as IMatch[];
  }
}

export default MatchesService;
