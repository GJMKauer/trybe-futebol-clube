import * as express from 'express';

import loginRoute from './routes/loginRoute';
import teamRoute from './routes/teamRoute';
import matchRoute from './routes/matchRoute';
import leaderboardRoute from './routes/leaderboardRoute';
import leaderboardHomeRoute from './routes/leaderboardHomeRoute';
import leaderboardAwayRoute from './routes/leaderboardAwayRoute';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    this.app.get('/', (req, res) => res.json({ ok: true }));
    this.app.use('/login', loginRoute);
    this.app.use('/teams', teamRoute);
    this.app.use('/matches', matchRoute);
    this.app.use('/leaderboard', leaderboardRoute);
    this.app.use('/leaderboard/home', leaderboardHomeRoute);
    this.app.use('/leaderboard/away', leaderboardAwayRoute);
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
