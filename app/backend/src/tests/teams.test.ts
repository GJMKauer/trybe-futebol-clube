import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import TeamModel from '../database/models/TeamModel';

import {
  allTeams,
  oneTeam,
} from './test_helpers/teamMocks';

import STATUS_CODES from './test_helpers';

chai.use(chaiHttp);

const { expect } = chai;

describe('Route /teams tests', () => {
  describe('GET /teams:', () => {
    describe('When accessing /teams route', () => {
      beforeEach(() => {
        sinon.stub(TeamModel, 'findAll').resolves(allTeams as TeamModel[])
      });

      afterEach(() => {
        (TeamModel.findAll as sinon.SinonStub).restore();
      });

      it('Should return all teams with a status 200', async () => {
        const response = await chai.request(app).get('/teams');

        expect(response.body).to.be.deep.equal(allTeams);
        expect(response.status).to.be.equal(STATUS_CODES.OK);
      });
    });

    describe('When accessing /teams/:id route', () => {
      beforeEach(() => {
        sinon.stub(TeamModel, 'findOne').resolves(oneTeam as unknown as TeamModel)
      });

      afterEach(() => {
        (TeamModel.findOne as sinon.SinonStub).restore();
      });

      it('Should return one team with a status 200', async () => {
        const response = await chai.request(app).get('/teams/1');

        expect(response.body).to.be.deep.equal(oneTeam);
        expect(response.status).to.be.equal(STATUS_CODES.OK);
      });
    });
  });
});