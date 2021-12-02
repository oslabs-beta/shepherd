const express = require('express');
const jwt = require('jsonwebtoken');
const { User, PasswordReset } = require('../Models/userModel');
// UserController class
const userController = {};

//needs refactoring
// create a new user in database
userController.createUser = (req, res, next) => {
  User.create(
    {
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
      arn: req.body.arn,
    },
    (err, result) => {
      if (err) {
        // if error code is 11000 it means an account already exists, so we notify user
        if (err.code === 11000) {
          res.locals.confirmation = { confirmation: false, email: false };
          return next();
        }
        return next(err);
      }
      // otherwise, if it works we send them a confirmation
      res.locals.confirmation = {
        confirmation: true,
        emailStatus: true,
        userInfo: {
          email: result.email,
          firstName: result.firstName,
          lastName: result.lastName,
          arn: result.arn,
        },
      };
      return next();
    }
  );
};

// verifies user exists and password matches in database during login
userController.verifyUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    // compare provided password with the hashed one
    if (await user.comparePassword(req.body.password)) {
      res.locals.confirmation = {
        confirmed: true,
        userInfo: {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          arn: user.arn,
          region: user.region,
        },
      };
      return next();
    } else {
      res.locals.confirmation = {
        confirmed: false,
      };
      return next();
    }
  } catch (err) {
    if (err) {
      console.error(err);
      return next(err);
    }
  }
};

// adds arn and region from the registration page to the user's account details
userController.addArn = async (req, res, next) => {
  try {
    const user = await User.findOneAndUpdate(
      { email: req.body.email },
      { arn: req.body.arn, region: req.body.regionSelect },
      { new: true }
    );
    return next();
  } catch (err) {
    if (err) {
      console.error(err);
      return next(err);
    }
  }
};

// handles when a user requests to change their default region
userController.updateRegion = async (req, res, next) => {
  const confirmation = {};
  try {
    const updatedUser = await User.findOneAndUpdate(
      { email: req.body.email },
      { region: req.body.newRegion },
      { new: true }
    );
    if (updatedUser) {
      confirmation.status = true;
      confirmation.region = updatedUser.region;
      res.locals.confirmation = confirmation;
      return next();
    } else {
      confirmation.status = false;
      res.locals.confirmation = confirmation;
      return next();
    }
  } catch (err) {
    if (err) console.error(err);
    return next(err);
  }
};

userController.updateEmail = async (req, res, next) => {
  const confirmation = {};
  // if the email from indexedDB doesn't match the original email they provided/the one they're currently
  // logged in with, don't move on
  if (req.body.accountEmail !== req.body.originalEmail) {
    confirmation.status = false;
    res.locals.confirmation = confirmation;
    return next();
  }
  // if emails match, update email in database
  try {
    const updatedUser = await User.findOneAndUpdate(
      { email: req.body.originalEmail },
      { email: req.body.newEmail },
      { new: true }
    );
    // if update is successful, send a confirmed status back and the new email to update
    // in indexedDB
    if (updatedUser) {
      confirmation.status = true;
      confirmation.newEmail = updatedUser.email;
    }
    res.locals.confirmation = confirmation;
    // send a confirmation of email update to the account's original email
    const emailStatus = sendEmail('emailChange', req.body.originalEmail);
    return next();
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

userController.updatePassword = async (req, res, next) => {
  const confirmation = {};
  // find account associated with the logged in user
  try {
    let user = await User.findOne({ email: req.body.email });
    // if the provided original password matches the one in the database
    // update and save the new password
    if (await user.comparePassword(req.body.oldPassword)) {
      user.password = req.body.newPassword;
      user.save();
      confirmation.status = true;
      // if password succesfully changed, send conf
      const emailStatus = sendEmail('passwordChange', req.body.email);
      res.locals.confirmation = confirmation;
      return next();
    }
    // if unsuccessful send false status to frontend to display an error message
    confirmation.status = false;
    return next();
  } catch (err) {
    console.error(err);
    return next(err);
  }
};
userController.updateArn = async (req, res, next) => {
  // find and update account in database
  try {
    const origUser = await User.findOneAndUpdate(
      { email: req.body.email },
      { arn: req.body.newArn }
    );
    // makes sure the user document was updated with new ARN
    const doubleCheck = await User.findOne({ email: req.body.email });
    if (doubleCheck) {
      if (doubleCheck.arn === req.body.newArn) {
        res.locals.confirmation = { status: true, arn: doubleCheck.arn };
        return next();
      }
      // if not, sends a false status back to notify user something went wrong
    } else {
      res.locals.confirmation = { status: false };
      return next();
    }
  } catch (err) {
    if (err) console.error(err);
    return next(err);
  }
};

//export the UserController
module.exports = userController;

