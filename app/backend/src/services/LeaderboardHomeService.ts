import sequelize = require('sequelize');
import TeamModel from '../database/models/TeamModel';
import MatchModel from '../database/models/MatchModel';
import { ILeaderboard } from '../interfaces/ILeaderboard';
import { convertEfficiency, sumPoints } from '../helpers';

class LeaderboardHomeService {
  private model = MatchModel;

  public async getLeaderboard(): Promise<ILeaderboard[]> {
    const leaderboard = await this.model.findAll({ where: { inProgress: false },
      attributes: [
        [sequelize.fn('COUNT', sequelize.col('home_team')), 'totalGames'],
        [sequelize.fn('SUM', sequelize.col('home_team_goals')), 'goalsFavor'],
        [sequelize.fn('SUM', sequelize.col('away_team_goals')), 'goalsOwn'],
        [sequelize.literal('SUM(home_team_goals) - SUM(away_team_goals)'), 'goalsBalance'],
        [sequelize.literal('SUM(home_team_goals > away_team_goals)'), 'totalVictories'],
        [sequelize.literal('SUM(home_team_goals = away_team_goals)'), 'totalDraws'],
        [sequelize.literal('SUM(home_team_goals < away_team_goals)'), 'totalLosses'],
        [sequelize.literal(`${sumPoints}`), 'totalPoints'],
        [sequelize.literal(`${convertEfficiency}`), 'efficiency']],
      include: [{ model: TeamModel, as: 'teamHome', attributes: ['teamName'] }],
      group: ['home_team'],
      order: [
        [sequelize.literal('totalPoints'), 'DESC'], [sequelize.literal('totalVictories'), 'DESC'],
        [sequelize.literal('goalsBalance'), 'DESC'], [sequelize.literal('goalsFavor'), 'DESC'],
        [sequelize.literal('goalsOwn'), 'ASC']] });

    return leaderboard as unknown as ILeaderboard[];
  }

  public async mapLeaderboard(): Promise<ILeaderboard[]> {
    const leaderboard = await this.getLeaderboard();

    const mappedLeaderboard = leaderboard.map((item) => ({
      name: (item.teamHome as unknown as ILeaderboard).teamName,
      totalPoints: (item.dataValues as unknown as ILeaderboard).totalPoints,
      totalGames: (item.dataValues as unknown as ILeaderboard).totalGames,
      totalVictories: (item.dataValues as unknown as ILeaderboard).totalVictories,
      totalDraws: (item.dataValues as unknown as ILeaderboard).totalDraws,
      totalLosses: (item.dataValues as unknown as ILeaderboard).totalLosses,
      goalsFavor: (item.dataValues as unknown as ILeaderboard).goalsFavor,
      goalsOwn: (item.dataValues as unknown as ILeaderboard).goalsOwn,
      goalsBalance: (item.dataValues as unknown as ILeaderboard).goalsBalance,
      efficiency: (item.dataValues as unknown as ILeaderboard).efficiency,
    }));

    return mappedLeaderboard as unknown as ILeaderboard[];
  }
}

export default LeaderboardHomeService;
