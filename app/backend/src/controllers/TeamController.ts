import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

class TeamsController {
  constructor(private teamService = new TeamService()) { }

  public getAllTeams = async (req: Request, res: Response): Promise<Response> => {
    const teams = await this.teamService.getAllTeams();

    return res.status(StatusCodes.OK).json(teams);
  };

  public getTeamById = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    const team = await this.teamService.getTeamById(id);

    return res.status(StatusCodes.OK).json(team);
  };
}

export default TeamsController;
