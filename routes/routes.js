import express from 'express';
const router = express.Router();

import Todo from '../models/todo';

router.get('/', (req, res) => {
    Todo.find({})
        .then(results => {
            let todos = results.filter(todo => {
                return !todo.done;
            })
            res.render('index', {todos: todos});
        })
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

export default router;
