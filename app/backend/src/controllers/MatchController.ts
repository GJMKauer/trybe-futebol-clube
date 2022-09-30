import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';
import { finishedMatch, notFoundMatch } from '../helpers/index';

class MatchController {
  constructor(private matchesService = new MatchesService()) { }

  public getAllMatches = async (req: Request, res: Response) => {
    const matches = await this.matchesService.getAllMatches();

    return res.status(StatusCodes.OK).json(matches);
  };

  public getMatchesByProgress = async (req: Request, res: Response) => {
    const { inProgress } = req.query;

    if (!inProgress || (inProgress !== 'true' && inProgress !== 'false')) {
      return this.getAllMatches(req, res);
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

    const result = await this.matchesService.finishMatch(id);

    if (!result) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: notFoundMatch });
    }

    return res.status(StatusCodes.OK).json({ message: finishedMatch });
  };

  public updateMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    const updatedMatch = await this.matchesService.updateMatch(id, homeTeamGoals, awayTeamGoals);

    if (!updatedMatch) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: notFoundMatch });
    }

    return res.status(StatusCodes.OK).json(updatedMatch);
  };
}

export default MatchController;
