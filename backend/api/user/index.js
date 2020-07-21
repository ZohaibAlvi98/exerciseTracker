'use strict';

var express = require('express');
var controller = require('./user.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.post('/register', controller.create);

router.post('/login', controller.login);

router.post("/update/:id",controller.update);

router.get("/get-user",controller.getUser)


// router.post('/register', controller.create());

// router.post('/register', controller.create());

module.exports = router;