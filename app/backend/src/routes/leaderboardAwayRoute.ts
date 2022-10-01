import { Router } from 'express';
import LeaderboardAwayController from '../controllers/LeaderboardAwayController';

const route = Router();
const leaderboardAwayController = new LeaderboardAwayController();

route.get('/', leaderboardAwayController.getLeaderboard);

export default route;
