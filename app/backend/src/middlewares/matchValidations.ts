import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import MatchModel from '../database/models/MatchModel';
import MatchesService from '../services/MatchesService';
import { equalTeams } from '../helpers';

class MatchValidation {
  private model = MatchModel;
  constructor(private matchesService = new MatchesService()) { }

  public createMatchV = async (req: Request, res: Response, next: NextFunction) => {
    const { homeTeam, awayTeam } = req.body;
    console.log(homeTeam, awayTeam);

    if (homeTeam === awayTeam) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: equalTeams });
    }

    next();
  };
}

export default MatchValidation;
