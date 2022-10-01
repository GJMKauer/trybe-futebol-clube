import { ILeaderboard } from '../interfaces/ILeaderboard';
import LeaderboardHomeService from './LeaderboardHomeService';
import LeaderboardAwayService from './LeaderboardAwayService';

class LeaderboardService {
  constructor(
    private leaderboardHomeService = new LeaderboardHomeService(),
    private leaderboardAwayService = new LeaderboardAwayService(),
  ) { }

  public async getPreviousLeaderboard(): Promise<ILeaderboard[]> {
    const leaderboardHome = await this.leaderboardHomeService.mapLeaderboard();
    const leaderboardAway = await this.leaderboardAwayService.mapLeaderboard();

    const leaderboardArrays = await Promise.all([leaderboardHome, leaderboardAway]);
    const flattenedLeaderboard = leaderboardArrays.flat();

    return flattenedLeaderboard;
  }

  public async getLeaderboard(): Promise<ILeaderboard[]> {
    const flattenedLeaderboard = await this.getPreviousLeaderboard();

    const unsortedLeaderboard = flattenedLeaderboard.reduce((acc, item) => {
      const existingItem = acc.find((i) => i.name === item.name);
      if (existingItem) {
        existingItem.totalPoints += item.totalPoints;
        existingItem.totalGames += item.totalGames;
        existingItem.totalVictories += item.totalVictories;
        existingItem.totalDraws += item.totalDraws;
        existingItem.totalLosses += item.totalLosses;
        existingItem.goalsFavor += item.goalsFavor;
        existingItem.goalsOwn += item.goalsOwn;
        existingItem.goalsBalance += item.goalsBalance;
        existingItem.efficiency = Number((((existingItem.totalPoints)
          / (((existingItem.totalGames) * 3))) * 100).toFixed(2));
      } else acc.push(item);

      return acc;
    }, [] as ILeaderboard[]);

    return unsortedLeaderboard as unknown as ILeaderboard[];
  }

  public async sortLeaderboard(): Promise<ILeaderboard[]> {
    const unsortedLeaderboard = this.getLeaderboard();

    const sortedLeaderboard = (await unsortedLeaderboard)
      .sort((a, b) => b.totalPoints - a.totalPoints
        || b.totalVictories - a.totalVictories
        || b.goalsBalance - a.goalsBalance
        || b.goalsFavor - a.goalsFavor
        || b.totalGames + a.totalGames);

    return sortedLeaderboard;
  }
}

export default LeaderboardService;
