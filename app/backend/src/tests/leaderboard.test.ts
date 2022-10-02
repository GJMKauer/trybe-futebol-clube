import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';

import LeaderboardHomeService from '../services/LeaderboardHomeService';
import LeaderboardAwayService from '../services/LeaderboardAwayService';
import LeaderboardService from '../services/LeaderboardService';

const leaderboardHomeService = new LeaderboardHomeService();
const leaderboardAwayService = new LeaderboardAwayService();
const leaderboardService = new LeaderboardService();

import {
  homeLeaderboard,
  homeLeaderBoardPosition4,
  awayLeaderboard,
  awayLeaderboardPosition7,
  leaderboard,
  leaderboardPosition13,
} from './test_helpers/leaderboardMocks';

import STATUS_CODES from './test_helpers';

chai.use(chaiHttp);

const { expect } = chai;

describe('Route /leaderboard tests', () => {
  beforeEach(() => {
    sinon.stub(leaderboardHomeService, 'mapLeaderboard').resolves(homeLeaderboard);
  });

  afterEach(() => {
    (leaderboardHomeService.mapLeaderboard as sinon.SinonStub).restore();
  });

    describe('GET /leaderboard/home route', () => {
      it('Should return the correct homeLeaderboard with a status 200', async () => {
        const response = await chai.request(app).get('/leaderboard/home');

        expect(response.body).to.be.an('array');
        expect(response.body[0]).to.have.all.keys(['name', 'totalPoints', 'totalGames', 'totalVictories', 'totalDraws', 'totalLosses', 'goalsFavor', 'goalsOwn', 'goalsBalance', 'efficiency'])
        expect(response.body[3]).to.be.deep.equal(homeLeaderBoardPosition4);
        expect(response.status).to.be.equal(STATUS_CODES.OK);
      });
    });

    describe('GET /leaderboard/away route', () => {
      beforeEach(() => {
        sinon.stub(leaderboardAwayService, 'mapLeaderboard').resolves(awayLeaderboard);
      });
    
      afterEach(() => {
        (leaderboardAwayService.mapLeaderboard as sinon.SinonStub).restore();
      });
      it('Should return the correct awayLeaderboard with a status 200', async () => {
        const response = await chai.request(app).get('/leaderboard/away');

        expect(response.body).to.be.an('array');
        expect(response.body[0]).to.have.all.keys(['name', 'totalPoints', 'totalGames', 'totalVictories', 'totalDraws', 'totalLosses', 'goalsFavor', 'goalsOwn', 'goalsBalance', 'efficiency'])
        expect(response.body[6]).to.be.deep.equal(awayLeaderboardPosition7);
        expect(response.status).to.be.equal(STATUS_CODES.OK);
      });
    });

    describe('GET /leaderboard route', () => {
      beforeEach(() => {
        sinon.stub(leaderboardService, 'sortLeaderboard').resolves(leaderboard);
      });
    
      afterEach(() => {
        (leaderboardService.sortLeaderboard as sinon.SinonStub).restore();
      });
      it('Should return the correct totalLeaderboard with a status 200', async () => {
        let response = await chai.request(app).get('/leaderboard');

        expect(response.body).to.be.an('array');
        expect(response.body[0]).to.have.all.keys(['name', 'totalPoints', 'totalGames', 'totalVictories', 'totalDraws', 'totalLosses', 'goalsFavor', 'goalsOwn', 'goalsBalance', 'efficiency'])
        expect(response.body[12]).to.be.deep.equal(leaderboardPosition13);
        expect(response.status).to.be.equal(STATUS_CODES.OK);
      });
    });
});