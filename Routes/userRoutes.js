const express = require('express');
const app = express.Router();
const {registerUser,loginUser} = require('../Controller/userController');

app.post('/register', registerUser);
app.post('/login', loginUser);

module.exports = app;