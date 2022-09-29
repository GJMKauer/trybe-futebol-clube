import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

class MatchController {
  constructor(private matchesService = new MatchesService()) { }

  public getAllMatches = async (req: Request, res: Response) => {
    const matches = await this.matchesService.getAllMatches();

    console.log('TIME AQUI', matches);

    return res.status(StatusCodes.OK).json(matches);
  };
}

export default MatchController;
