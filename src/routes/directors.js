const { getAll } = require('../controllers/directors.controllers');
const express = require('express');

// se crea una ruta  director

const directorsRouter = express.Router();

directorsRouter.route('/')
    .get(getAll)

module.exports = directorsRouter;

