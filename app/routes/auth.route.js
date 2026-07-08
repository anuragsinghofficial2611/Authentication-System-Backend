const express = require('express');
const router = express.Router();
const userModel = require('../models/user.model')
const { register } = require('../controllers/auth.controller');
const { login } = require('../controllers/auth.controller');

const bcrypt = require("bcrypt");
router.post('/register',register);
router.post('/login',login);


module.exports = router