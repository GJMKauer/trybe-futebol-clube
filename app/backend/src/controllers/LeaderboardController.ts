import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

class LeaderboardController {
  constructor(private leaderboardService = new LeaderboardService()) { }

  public getLeaderboard = async (req: Request, res: Response) => {
    const leaderboard = await this.leaderboardService.sortLeaderboard();

    return res.status(StatusCodes.OK).json(leaderboard);
  };
}

export default LeaderboardController;
