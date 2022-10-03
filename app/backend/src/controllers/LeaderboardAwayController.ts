import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import LeaderboardAwayService from '../services/LeaderboardAwayService';

class LeaderboardAwayController {
  constructor(private leaderboardAwayService = new LeaderboardAwayService()) { }

  public getLeaderboard = async (req: Request, res: Response): Promise<Response> => {
    const leaderboard = await this.leaderboardAwayService.mapLeaderboard();

    return res.status(StatusCodes.OK).json(leaderboard);
  };
}

export default LeaderboardAwayController;
