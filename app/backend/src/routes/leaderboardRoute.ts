import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const route = Router();
const leaderboardController = new LeaderboardController();

route.get('/', leaderboardController.getLeaderboard);

export default route;
