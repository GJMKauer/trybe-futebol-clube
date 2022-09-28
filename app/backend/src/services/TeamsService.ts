import TeamModel from '../database/models/TeamModel';
import { ITeam } from '../interfaces/ITeam';

class TeamsService {
  private model = TeamModel;

  public async getAllTeams(): Promise<ITeam[]> {
    const user = await this.model.findAll();

    return user;
  }
}

export default TeamsService;
