const { getAll } = require('../controllers/actors.controllers');
const express = require('express');

const actrosRouter = express.Router();

actrosRouter.route('/')
    .get(getAll)

module.exports = actrosRouter;