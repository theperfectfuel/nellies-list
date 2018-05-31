'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _index = require('../index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expect = _chai2.default.expect;

_chai2.default.use(_chaiHttp2.default);

describe('Todo List', function () {

    before(function () {
        return (0, _index.runServer)();
    });

    after(function () {
        return (0, _index.closeServer)();
    });

    it('should return a list of todos on GET', function () {
        return _chai2.default.request(_index.app).get('/').then(function (res) {
            expect(res).to.have.status(200);
        });
    });
});