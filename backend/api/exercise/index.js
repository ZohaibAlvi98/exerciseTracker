'use strict';

var express = require('express');
var controller = require('./exercise.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/',controller.fetchAllExercises);

router.post('/add',controller.create)

router.get('/fetch-exercise/:id',controller.fetchExercise)

router.post('/delete-exercise',controller.delete)

module.exports = router;