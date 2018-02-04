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
        var todos = results.filter(function (todo) {
            return !todo.done;
        });
        res.render('index', { todos: todos });
    });
});

router.get('/done', function (req, res) {
    _todo2.default.find({}).then(function (results) {
        var doneTodos = results.filter(function (todo) {
            return todo.done;
        });
        res.render('index', { doneTodos: doneTodos });
    });
});

router.post('/todo', function (req, res) {
    var newTodo = new _todo2.default({ description: req.body.description });
    newTodo.save().then(function () {
        res.redirect('/');
    });
});

router.post('/todo/done/:id', function (req, res) {
    var todoId = req.params.id;
    _todo2.default.findById(todoId).exec().then(function (todo) {
        todo.done = !todo.done;
        return todo.save();
    }).then(function () {
        res.redirect('/');
    });
});

router.post('/todo/delete/:id', function (req, res) {
    var todoId = req.params.id;
    _todo2.default.findByIdAndRemove(todoId).exec().then(function () {
        res.redirect('/');
    });
});

exports.default = router;