import TeamModel from '../database/models/TeamModel';
import { ITeam } from '../interfaces/ITeam';

class TeamsService {
  private model = TeamModel;

  public async getAllTeams(): Promise<ITeam[]> {
    const team = await this.model.findAll();

    return team;
  }

  public async getTeamById(id: string): Promise<ITeam> {
    const team = await this.model.findOne({ where: { id } });

    return team as ITeam;
  }
}

export default TeamsService;
