import { Router } from 'express';
import TeamController from '../controllers/TeamController';

const route = Router();
const teamController = new TeamController();

route.get('/', teamController.getAllTeams);
route.get('/:id', teamController.getTeamById);

export default route;
