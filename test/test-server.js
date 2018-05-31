const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../index');

const expect = chai.expect;

const DBUrl = process.env.DBUrl || 'mongodb://localhost:27017/todos';

chai.use(chaiHttp);

describe('Todo List', function() {

    before(function() {
        return runServer(DBUrl);
    });

    after(function() {
        return closeServer();
    });

    it('should return a list of todos on GET', function() {
        return chai.request(app)
            .get('/')
            .then(function(res) {
                expect(res).to.have.status(200);
            })
    })
})