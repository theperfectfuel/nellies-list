'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressHandlebars = require('express-handlebars');

var _expressHandlebars2 = _interopRequireDefault(_expressHandlebars);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _routes = require('./routes/routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PORT = process.env.PORT || "8080";
var DBUrl = process.env.DBUrl || 'mongodb://localhost:27017/todos';
var app = (0, _express2.default)();

_mongoose2.default.connect(DBUrl, function () {
    console.log('DB connected');
});

app.engine('hbs', (0, _expressHandlebars2.default)({
    extname: 'hbs'
}));
app.set('view engine', 'hbs');
app.set('views', './views');
app.use(_express2.default.static('public'));
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use('/', _routes2.default);

app.listen(PORT, function () {
    console.log('server listening on port: ' + PORT);
});