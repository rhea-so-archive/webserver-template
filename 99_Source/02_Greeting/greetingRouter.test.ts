import mochaIt from 'mocha-it';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
chai.use(chaiHttp);
import { INIExpress } from '../01_Config/INIExpress';
import { StatusCodes } from 'http-status-codes';

describe('01_Greeting Router', () => {
	it('인사를 받습니다.', mochaIt(async (done) => {
		chai.request(`http://${INIExpress.URL}`).
			post('/greeting').
			send({ name: 'test' }).
			end((_err, res) => {
				expect(res).to.have.status(StatusCodes.OK);
				expect(res.body.message).to.be.equal('Hi! test.');
				done();
			});
	}));

	it('이름이 3글자 미만인 경우 Bad Request 에러를 받습니다.', mochaIt(async (done) => {
		chai.request(`http://${INIExpress.URL}`).
			post('/greeting').
			send({ name: 'te' }).
			end((_err, res) => {
				expect(res).to.have.status(StatusCodes.BAD_REQUEST);
				done();
			});
	}));

	it('이름이 10글자 초과인 경우 Bad Request 에러를 받습니다.', mochaIt(async (done) => {
		chai.request(`http://${INIExpress.URL}`).
			post('/greeting').
			send({ name: '01234567890' }).
			end((_err, res) => {
				expect(res).to.have.status(StatusCodes.BAD_REQUEST);
				done();
			});
	}));
});
