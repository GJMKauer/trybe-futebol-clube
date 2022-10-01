import { Router } from 'express';
import LeaderboardHomeController from '../controllers/LeaderboardHomeController';

const route = Router();
const leaderboardHomeController = new LeaderboardHomeController();

route.get('/', leaderboardHomeController.getLeaderboard);

export default route;
