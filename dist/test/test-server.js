'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');

var _require = require('../index'),
    app = _require.app,
    runServer = _require.runServer,
    closeServer = _require.closeServer;

var expect = chai.expect;

chai.use(chaiHttp);

describe('Todo List', function () {

    before(function () {
        return runServer();
    });

    after(function () {
        return closeServer();
    });

    it('should return a list of todos on GET', function () {
        return chai.request(app).get('/').then(function (res) {
            expect(res).to.have.status(200);
        });
    });
});