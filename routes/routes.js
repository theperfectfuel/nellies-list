import express from 'express';
const router = express.Router();

import Todo from '../models/todo';

router.get('/', (req, res) => {
    Todo.find({})
        .then(results => {
            res.render('index', {todos: results});
        })
});

export default router;