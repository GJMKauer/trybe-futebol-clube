import * as express from 'express';

import UserController from './controllers/UsersController';
import TeamController from './controllers/TeamsController';
import MatchController from './controllers/MatchController';

import LoginValidation from './middlewares/loginValidations';
import MatchValidation from './middlewares/matchValidations';

const userController = new UserController();
const teamController = new TeamController();
const matchController = new MatchController();

const loginValidation = new LoginValidation();
const matchValidations = new MatchValidation();

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    this.app.get('/', (req, res) => res.json({ ok: true }));
    this.app.post('/login', loginValidation.loginV, userController.login);
    this.app.get('/login/validate', userController.validate);
    this.app.get('/teams', teamController.getAllTeams);
    this.app.get('/teams/:id', teamController.getTeamById);
    this.app.get('/matches', matchController.getMatchesByProgress);
    this.app.post('/matches', matchValidations.createMatchV, matchController.addNewMatch);
    this.app.patch('/matches/:id/finish', matchController.finishMatch);
  }

  private config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

export const { app } = new App();
