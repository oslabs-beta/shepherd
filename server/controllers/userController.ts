const express = require('express');
const User = require('../models/UserModel.ts');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// UserController class
const UserController: any = {};

UserController.signup = async (req, res, next) => {
  // Check if user already exists
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ message: 'User already exists' });
  };
  // If not, create new user with the given email and password and Hash the password
  const newUser = new User({
    _id: new mongoose.Types.ObjectId(),
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10)
  });
  // Save the new user
  await newUser.save();
  // Generate token
  const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET);
  res.status(201).json({ token });
}

// Login user
UserController.login = async (req, res, next) => {
  // Check if user exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ message: 'User does not exist' });
  }
  // Check if password is correct
  const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Invalid password' });
  }
  // Generate token
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  res.status(200).json({ token });
}

//export the UserController
export default UserController;