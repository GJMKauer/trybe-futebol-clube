import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import TeamsService from '../services/TeamsService';

class TeamsController {
  constructor(private teamsService = new TeamsService()) { }

  public getAllTeams = async (req: Request, res: Response) => {
    const result = await this.teamsService.getAllTeams();

    return res.status(StatusCodes.OK).json(result);
  };

  public getTeamById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await this.teamsService.getTeamById(id);

    return res.status(StatusCodes.OK).json(result);
  };
}

export default TeamsController;
