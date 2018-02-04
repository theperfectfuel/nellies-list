'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _todo = require('../models/todo');

var _todo2 = _interopRequireDefault(_todo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', function (req, res) {
    _todo2.default.find({}).then(function (results) {
        res.render('index', { todos: results });
    });
});

router.get('/done', function (req, res) {
    _todo2.default.find({}).then(function (results) {
        var doneTodos = results.filter(function (todo) {
            return todo.done;
        });
        res.render('index', { todos: doneTodos });
    });
});

exports.default = router;