const { getAll } = require('../controllers/genres.controllers');
const express = require('express');

// se crea una ruta para genero

const genresRouter = express.Router();

genresRouter.route('/')
    .get(getAll)

module.exports = genresRouter;