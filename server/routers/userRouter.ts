// set up a router for user authentication
const express = require('express');
const router = express.Router();
const User = require('../models/UserModel.ts');
const expressValidator = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//needs work



module.exports = router;