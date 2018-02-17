'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _todo = require('../models/todo');

var _todo2 = _interopRequireDefault(_todo);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

//var ObjectId = require('mongodb').ObjectID;
var pointTotal = 100;

router.get('/', function (req, res) {
    _todo2.default.find({}).then(function (results) {
        var todos = results.filter(function (todo) {
            todo.dueDate = (0, _moment2.default)(todo.createdAt).add(todo.dueDateOffset, 'days').format('LL');
            return !todo.done;
        });
        res.render('index', {
            todos: todos,
            pointTotal: pointTotal
        });
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

router.get('/todo/edit/:id', function (req, res) {
    var todoId = req.params.id;
    _todo2.default.findById(todoId).exec().then(function (todo) {
        res.render('todo', { todo: todo, pointTotal: pointTotal });
    }).catch(function (err) {
        console.log(err);
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
        pointTotal += todo.pointValue;
        todo.pointValue = 0;
        return todo.save();
    }).then(function () {
        res.redirect('/');
    });
});

router.post('/todo/edit/:id', function (req, res) {
    var todoId = req.params.id;
    _todo2.default.findById(todoId).exec().then(function (todo) {
        todo.pointValue = req.body.pointValue;
        todo.category = req.body.category;
        todo.owner = req.body.owner;
        todo.createdBy = req.body.createdBy;
        todo.dueDateOffset = req.body.dueDateOffset;
        return todo.save();
    }).then(function () {
        res.redirect('/');
    }).catch(function (err) {
        console.log(err);
    });
});

router.post('/todo/delete/:id', function (req, res) {
    var todoId = req.params.id;
    _todo2.default.findByIdAndRemove(todoId).exec().then(function () {
        res.redirect('/');
    });
});

exports.default = router;