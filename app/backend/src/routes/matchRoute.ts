import { Router } from 'express';
import MatchController from '../controllers/MatchController';
import MatchValidations from '../middlewares/matchValidations';

const route = Router();
const matchController = new MatchController();
const matchValidations = new MatchValidations();

route.get('/', matchController.getMatchesByProgress);
route.post(
  '/',
  matchValidations.createMatchV,
  matchValidations.checkTeamsV,
  matchValidations.checkTokenV,
  matchController.addNewMatch,
);
route.patch('/:id/finish', matchController.finishMatch);
route.patch('/:id', matchController.updateMatch);

export default route;
