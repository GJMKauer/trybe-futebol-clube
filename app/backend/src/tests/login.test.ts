import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import UserModel from '../database/models/UserModel';

import {
  validUser,
  validUserDecoded,
  invalidUser,
  userWithoutEmail,
  userWithoutPassword,
  userRole,
  userToken,
} from './test_helpers/userMocks';

import STATUS_CODES from './test_helpers';

import {
  incorrectData,
  invalidData,
  unfilledData,
  notFoundToken,
} from '../helpers';

chai.use(chaiHttp);

const { expect } = chai;

describe('Route /login tests', () => {
  describe('POST /login:', () => {
    describe('With valid user', () => {
      beforeEach(() => {
        sinon.stub(UserModel, 'findOne').resolves(validUser as UserModel)
      });

      afterEach(() => {
        (UserModel.findOne as sinon.SinonStub).restore();
      });

      it('Should return a JWT Token with status 200', async () => {
        const response = await chai.request(app).post('/login').send(validUserDecoded)

        expect(response.body).to.have.property('token');
        expect(response.status).to.be.equal(STATUS_CODES.OK);
      });
    });

    describe('With invalid user email', () => {
      beforeEach(() => {
        sinon.stub(UserModel, 'findOne').resolves(null as unknown as UserModel);
      });

      afterEach(() => {
        (UserModel.findOne as sinon.SinonStub).restore();
      });

      it('Should return error message with status 401', async () => {
        const response = await chai.request(app).post('/login').send(invalidUser);

        expect(response.body).to.be.deep.equal({ message: incorrectData });
        expect(response.status).to.be.equal(STATUS_CODES.UNAUTHORIZED);
      });
    });

    describe('With invalid user password', () => {
      beforeEach(() => {
        sinon.stub(UserModel, 'findOne').resolves(invalidUser as UserModel);
      });

      afterEach(() => {
        (UserModel.findOne as sinon.SinonStub).restore();
      });

      it('Should return error message with status 401', async () => {
        const response = await chai.request(app).post('/login').send(invalidUser);

        expect(response.body).to.be.deep.equal({ message: invalidData });
        expect(response.status).to.be.equal(STATUS_CODES.UNAUTHORIZED);
      });
    });

    describe('Without user email', () => {
      it('Should return error message with status 400', async () => {
        const response = await chai.request(app).post('/login').send(userWithoutEmail);

        expect(response.body).to.be.deep.equal({ message: unfilledData });
        expect(response.status).to.be.equal(STATUS_CODES.BAD_REQUEST);
      });
    });

    describe('Without user password', () => {
      it('Should return error message with status 400', async () => {
        const response = await chai.request(app).post('/login').send(userWithoutPassword);

        expect(response.body).to.be.deep.equal({ message: unfilledData });
        expect(response.status).to.be.equal(STATUS_CODES.BAD_REQUEST);
      });
    });
  });

  describe('GET /login/validate:', () => {
    describe('When it receives a valid token', () => {
      beforeEach(() => {
        sinon.stub(UserModel, 'findOne').resolves(userRole as UserModel)
      });

      afterEach(() => {
        (UserModel.findOne as sinon.SinonStub).restore();
      });

      it('Should return user role with status 200', async () => {
        const response = await chai.request(app).get('/login/validate').set('authorization', userToken);

        expect(response.body).to.be.deep.equal({ role: userRole.role });
        expect(response.status).to.be.equal(STATUS_CODES.OK);
      });
    });

    describe('When it does not receive a token', () => {
      it('Should return error message with status 401', async () => {
        const response = await chai.request(app).get('/login/validate');

        expect(response.body).to.be.deep.equal({ message: notFoundToken });
        expect(response.status).to.be.equal(STATUS_CODES.UNAUTHORIZED);
      });
    });
  });  
});