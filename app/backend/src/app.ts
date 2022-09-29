import * as express from 'express';

import UserController from './controllers/UsersController';
import TeamController from './controllers/TeamsController';

import LoginValidation from './middlewares/loginValidations';

const userController = new UserController();
const teamController = new TeamController();

const loginValidation = new LoginValidation();

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

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
