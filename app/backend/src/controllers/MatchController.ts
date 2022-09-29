import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';
import { finishedMatch } from '../helpers/index';

class MatchController {
  constructor(private matchesService = new MatchesService()) { }

  public getAllMatches = async (req: Request, res: Response) => {
    const matches = await this.matchesService.getAllMatches();

    return res.status(StatusCodes.OK).json(matches);
  };

  public getMatchesByProgress = async (req: Request, res: Response) => {
    const { inProgress } = req.query;

    if (inProgress !== 'true' && inProgress !== 'false') {
      const matches = await this.matchesService.getAllMatches();

      return res.status(StatusCodes.OK).json(matches);
    }

    const q = inProgress === 'true';

    const filteredMatches = await this
      .matchesService.getMatchesByProgress(q);

    return res.status(StatusCodes.OK).json(filteredMatches);
  };

  public addNewMatch = async (req: Request, res: Response) => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;
    const inProgress = true;

    const match = await this.matchesService.addNewMatch({
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress,
    });

    return res.status(StatusCodes.CREATED).json(match);
  };

  public finishMatch = async (req: Request, res: Response) => {
    const { id } = req.params;

    await this.matchesService.finishMatch(id);

    return res.status(StatusCodes.OK).json({ message: finishedMatch });
  };
}

export default MatchController;
