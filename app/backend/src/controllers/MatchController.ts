import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import MatchService from '../services/MatchService';
import { finishedMatch, notFoundMatch } from '../helpers/index';

class MatchController {
  constructor(private matchService = new MatchService()) { }

  public getAllMatches = async (_req: Request, res: Response): Promise<Response> => {
    const matches = await this.matchService.getAllMatches();

    return res.status(StatusCodes.OK).json(matches);
  };

  public getMatchesByProgress = async (req: Request, res: Response): Promise<Response> => {
    const { inProgress } = req.query;

    if (!inProgress || (inProgress !== 'true' && inProgress !== 'false')) {
      return this.getAllMatches(req, res);
    }

    const query = inProgress === 'true';

    const filteredMatches = await this
      .matchService.getMatchesByProgress(query);

    return res.status(StatusCodes.OK).json(filteredMatches);
  };

  public addNewMatch = async (req: Request, res: Response): Promise<Response> => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;
    const inProgress = true;

    const match = await this.matchService.addNewMatch({
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress,
    });

    return res.status(StatusCodes.CREATED).json(match);
  };

  public finishMatch = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    const result = await this.matchService.finishMatch(id);

    if (!result) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: notFoundMatch });
    }

    return res.status(StatusCodes.OK).json({ message: finishedMatch });
  };

  public updateMatch = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    const updatedMatch = await this.matchService.updateMatch(id, homeTeamGoals, awayTeamGoals);

    if (!updatedMatch) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: notFoundMatch });
    }

    return res.status(StatusCodes.OK).json(updatedMatch);
  };
}

export default MatchController;
