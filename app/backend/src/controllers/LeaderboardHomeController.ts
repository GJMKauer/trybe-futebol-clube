import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import LeaderboardHomeService from '../services/LeaderboardHomeService';

class LeaderboardController {
  constructor(private leaderboardHomeService = new LeaderboardHomeService()) { }

  public getLeaderboard = async (req: Request, res: Response) => {
    const leaderboard = await this.leaderboardHomeService.mapLeaderboard();

    return res.status(StatusCodes.OK).json(leaderboard);
  };
}

export default LeaderboardController;
