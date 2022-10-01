import * as Jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import MatchModel from '../database/models/MatchModel';
import { equalTeams, invalidTeams, invalidToken, JWT_SECRET } from '../helpers';

class MatchValidation {
  private model = MatchModel;

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

  public checkTokenV = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { authorization } = req.headers;

      const newAuthorization = authorization?.replace('Bearer ', '');

      Jwt.verify(newAuthorization as string, JWT_SECRET);

      next();
    } catch (error) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: invalidToken });
    }
  };
}

export default MatchValidation;
