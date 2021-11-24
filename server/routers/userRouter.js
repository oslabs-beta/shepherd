const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

// handle signup requests
router.route('/signup').post(userController.createUser, (req, res) => {
  res.status(200).json(res.locals.confirmation);
});

// handle login requests
router.route('/login').post(userController.verifyUser, (req, res) => {
  res.status(200).json(res.locals.confirmation);
});

// handle registration requests
router.route('/register').post(userController.addArn, (req, res) => {
  res.sendStatus(200);
});

// handle when a user requests to update their region
router.route('/updateRegion').post(userController.updateRegion, (req, res) => {
  res.status(200).json(res.locals.confirmation);
});

// handle when a user requests to update their ARN
router.route('/updateArn').post(userController.updateArn, (req, res) => {
  res.status(200).json(res.locals.confirmation);
});

// handle when a user requests to update their email
router.route('/updateEmail').post(userController.updateEmail, (req, res) => {
  res.status(200).json(res.locals.confirmation);
});

// handle when a user requests to change their email
router
  .route('/updatePassword')
  .post(userController.updatePassword, (req, res) => {
    res.status(200).json(res.locals.confirmation);
  });

// handle when a user starts the "Forgot Password" process
router
  .route('/forgotPassword')
  .post(userController.forgotPassword, (req, res) => {
    res.status(200).json(res.locals.confirmation);
  });

// handles accepting and verifying the verification code the user sends to continue changing password
router
  .route('/verifyAccount')
  .post(userController.checkVerificationCode, (req, res) => {
    res.status(200).json(res.locals.confirmation);
  });

// handles actually resetting the user's password
router
  .route('/resetPassword')
  .post(userController.resetPassword, (req, res) => {
    res.status(200).json(res.locals.confirmation);
  });

module.exports = router;
