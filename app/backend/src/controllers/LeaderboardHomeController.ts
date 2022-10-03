import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import LeaderboardHomeService from '../services/LeaderboardHomeService';

class LeaderboardHomeController {
  constructor(private leaderboardHomeService = new LeaderboardHomeService()) { }

  public getLeaderboard = async (req: Request, res: Response): Promise<Response> => {
    const leaderboard = await this.leaderboardHomeService.mapLeaderboard();

    return res.status(StatusCodes.OK).json(leaderboard);
  };
}

export default LeaderboardHomeController;
