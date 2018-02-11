import express from 'express';
import moment from 'moment';
const router = express.Router();

import Todo from '../models/todo';

let pointTotal = 100;

router.get('/', (req, res) => {
    Todo.find({})
        .then(results => {
            let todos = results.filter(todo => {
                todo.owner = 'Popeye';
                todo.newDate = moment(todo.createdAt).add(7, 'days').format('LL');
                return !todo.done;
            })
            res.render('index', 
                {
                    todos: todos, 
                    pointTotal: pointTotal
                });
        });
});

router.get('/done', (req, res) => {
    Todo.find({})
        .then(results => {
            let doneTodos = results.filter(todo => {
                return todo.done;
            })
            res.render('index', {doneTodos: doneTodos});
        })
});

router.post('/todo', (req, res) => {
    let newTodo = new Todo({description: req.body.description});
    newTodo
        .save()
        .then(() => {
            res.redirect('/');
        });
});

router.post('/todo/done/:id', (req, res) => {
    let todoId = req.params.id;
    Todo.findById(todoId)
        .exec()
        .then(todo => {
            todo.done = !todo.done;
            pointTotal += todo.pointValue;
            todo.pointValue = 0;
            return todo.save();
        })
        .then(() => {
            res.redirect('/');
        });
});

router.post('/todo/delete/:id', (req, res) => {
    let todoId = req.params.id;
    Todo.findByIdAndRemove(todoId)
        .exec()
        .then(() => {
            res.redirect('/');
        });
});

export default router;
