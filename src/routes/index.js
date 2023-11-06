const express = require('express');
const genresRouter = require('./genres.router');
const actrosRouter = require('./actors.router');
const directorsRouter = require('./directors.router.js');
const moviesRouter = require('./movies.router');
const router = express.Router();

// colocar las rutas aquí

router.use('/genres', genresRouter);
router.use('/actors', actrosRouter);
router.use('/directors', directorsRouter);
router.use('/movies', moviesRouter);



module.exports = router;