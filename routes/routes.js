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
            return todo.save();
        })
        .then(() => {
            res.redirect('/');
        });
});

export default router;
