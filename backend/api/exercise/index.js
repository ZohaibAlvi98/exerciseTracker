'use strict';

var express = require('express');
var controller = require('./exercise.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/',controller.fetchAllExercises)