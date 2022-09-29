import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import MatchModel from '../database/models/MatchModel';
import MatchesService from '../services/MatchesService';
import { equalTeams, invalidTeams } from '../helpers';

class MatchValidation {
  private model = MatchModel;
  constructor(private matchesService = new MatchesService()) { }

  public createMatchV = async (req: Request, res: Response, next: NextFunction) => {
    const { homeTeam, awayTeam } = req.body;

    if (homeTeam === awayTeam) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: equalTeams });
    }

    next();
  };

  public checkTeamsV = async (req: Request, res: Response, next: NextFunction) => {
    const { homeTeam, awayTeam } = req.body;

    const homeTeamExists = await this.model.findOne({ where: { homeTeam } });
    const awayTeamExists = await this.model.findOne({ where: { awayTeam } });

    if (!homeTeamExists || !awayTeamExists) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: invalidTeams });
    }

    next();
  };
}

export default MatchValidation;
