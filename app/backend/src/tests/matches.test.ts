import * as sinon from 'sinon';
import * as chai from 'chai';
import { Response } from 'superagent';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import MatchModel from '../database/models/MatchModel';

import {
  allMatches,
  inProgressMatches,
  notInProgressMatches,
  newMatch,
  actualUpdatedMatch,
  validUserDatabase,
  newMatchEqualTeams,
  newMatchNonExistentTeams,
} from './test_helpers/matchMocks';

import STATUS_CODES from './test_helpers';

import {
  equalTeams,
  finishedMatch,
  invalidTeams,
  notFoundMatch,
  invalidToken,
} from '../helpers';

chai.use(chaiHttp);

const { expect } = chai;

describe('Route /matches tests', () => {
  describe('GET /matches:', () => {
    describe('When accessing /matches route', () => {
      beforeEach(() => {
        sinon.stub(MatchModel, 'findAll').resolves(allMatches as unknown as MatchModel[])
      });

      afterEach(() => {
        (MatchModel.findAll as sinon.SinonStub).restore();
      });

      it('Should return all matches with a status 200', async () => {
        const response = await chai.request(app).get('/matches');

        expect(response.body).to.be.an('array');
        expect(response.status).to.be.equal(STATUS_CODES.OK);
      });
    });

    describe('When using queryString - inProgress=true', async () => {
      beforeEach(() => {
        sinon.stub(MatchModel, 'findAll').resolves(inProgressMatches as unknown as MatchModel[])
      });

      afterEach(() => {
        (MatchModel.findAll as sinon.SinonStub).restore();
      });

      it('Should return an array containing one match', async () => {
        const response = await chai.request(app).get('/matches?inProgress=true');

        expect(response.body).to.be.deep.equal(inProgressMatches);
        expect(response.status).to.be.equal(STATUS_CODES.OK);
      });
    });

    describe('When using queryString - inProgress=false', async () => {
      beforeEach(() => {
        sinon.stub(MatchModel, 'findAll').resolves(notInProgressMatches as unknown as MatchModel[])
      });

      afterEach(() => {
        (MatchModel.findAll as sinon.SinonStub).restore();
      });

      it('Should return an array containing one match', async () => {
        const response = await chai.request(app).get('/matches?inProgress=false');

        expect(response.body).to.be.deep.equal(notInProgressMatches);
        expect(response.status).to.be.equal(STATUS_CODES.OK);
      });
    });

    describe('When trying to add a new match to database', async () => {
      let returnHttp: Response;
      let response: Response;
      beforeEach(async () => {
        returnHttp = await chai.request(app).post('/login').send(validUserDatabase);

        response = await chai.request(app).post('/matches').set('authorization', returnHttp.body.token).send(newMatch);
        sinon.stub(MatchModel, 'findOne').resolves(newMatch as MatchModel)
      });

      afterEach(() => {
        (MatchModel.findOne as sinon.SinonStub).restore();
      });

      it('Should have the new match added to database', async () => {
        expect(response.body).to.be.deep.equal({ ...newMatch, id: response.body.id, inProgress: response.body.inProgress });
        expect(response.status).to.be.equal(STATUS_CODES.CREATED);
      });
    });

    describe('When trying to add a new match to database with two equal teams', async () => {
      let returnHttp: Response;
      let response: Response;
      beforeEach(async () => {
        returnHttp = await chai.request(app).post('/login').send(validUserDatabase);

        response = await chai.request(app).post('/matches').set('authorization', returnHttp.body.token).send(newMatchEqualTeams);
        sinon.stub(MatchModel, 'findOne').resolves(newMatchEqualTeams as MatchModel)
      });

      afterEach(() => {
        (MatchModel.findOne as sinon.SinonStub).restore();
      });

      it('Should return an error saying that you can\'t add a new match with two equal teams with status 401', async () => {
        expect(response.body).to.be.deep.equal({ message: equalTeams });
        expect(response.status).to.be.equal(STATUS_CODES.UNAUTHORIZED);
      });
    });

    describe('When trying to add a new match to database with a team that does not exist on database', async () => {
      let returnHttp: Response;
      let response: Response;
      beforeEach(async () => {
        returnHttp = await chai.request(app).post('/login').send(validUserDatabase);

        response = await chai.request(app).post('/matches').set('authorization', returnHttp.body.token).send(newMatchNonExistentTeams);
        sinon.stub(MatchModel, 'findOne').resolves(newMatchNonExistentTeams as MatchModel)
      });

      afterEach(() => {
        (MatchModel.findOne as sinon.SinonStub).restore();
      });

      it('Should return an error saying that you can\'t add a new match with teams that does not exist on database', async () => {
        expect(response.body).to.be.deep.equal({ message: invalidTeams });
        expect(response.status).to.be.equal(STATUS_CODES.NOT_FOUND);
      });
    });

    describe('When trying to add a new match to database without being logged in', async () => {
      let response: Response;
      beforeEach(async () => {
        response = await chai.request(app).post('/matches').send(newMatch);
        sinon.stub(MatchModel, 'findOne').resolves(newMatch as MatchModel)
      });

      afterEach(() => {
        (MatchModel.findOne as sinon.SinonStub).restore();
      });

      it('Should return an error saying that the user token is invalid', async () => {
        expect(response.body).to.be.deep.equal({ message: invalidToken });
        expect(response.status).to.be.equal(STATUS_CODES.UNAUTHORIZED);
      });
    });

    describe('When trying to finish a match', async () => {
      it('Should update a specific match on database', async () => {
        const response = await chai.request(app).patch('/matches/3/finish');

        expect(response.body).to.be.deep.equal({ message: finishedMatch });
        expect(response.status).to.be.equal(STATUS_CODES.OK);
      });

      it('Should return an error when trying to finish a match that does not exist', async () => {
        const response = await chai.request(app).patch('/matches/99/finish');

        expect(response.body).to.be.deep.equal({ message: notFoundMatch });
        expect(response.status).to.be.equal(STATUS_CODES.NOT_FOUND);
      });
    });

    describe('When trying to update a match', async () => {
      it('Should update a specific match on database', async () => {
        const response = await chai.request(app).patch('/matches/3').send({ homeTeamGoals: 10, awayTeamGoals: 5 });

        expect(response.body).to.be.deep.equal(actualUpdatedMatch);
        expect(response.status).to.be.equal(STATUS_CODES.OK);
      });

      it('Should return an error when trying to update a match that does not exist', async () => {
        const response = await chai.request(app).patch('/matches/99').send({ homeTeamGoals: 10, awayTeamGoals: 5 });

        expect(response.body).to.be.deep.equal({ message: notFoundMatch });
        expect(response.status).to.be.equal(STATUS_CODES.NOT_FOUND);
      });
    });
  });
});