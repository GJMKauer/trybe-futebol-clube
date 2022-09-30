import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import * as server from '../server';

chai.use(chaiHttp);

const { expect } = chai;

describe('Route "/" tests', () => {
  describe('GET "/":', () => {
    describe('Expect server to be running and finding .env PORT variable', () => {
      it('Should return an "ok" message at "/" route', async () => {
        const response = await chai.request(app).get('/');

        expect(response.body).to.be.deep.equal({ ok: true })
        expect(server).to.be.an('object');
      });
    });
  });
});