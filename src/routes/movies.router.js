const { getAll, create, getOne, remove, update } = require('../controllers/movies.controllers');
const express = require('express');

const moviesRouter = express.Router();

moviesRouter.route('/')
    .get(getAll)
    .post(create);

moviesRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = moviesRouter;