const express = require('express');
const { Login, Register } = require('../controllers/AuthController');

const AuthRouter = express.Router();

//Login route 
AuthRouter.post('/login' , Login);
// Register 
AuthRouter.post('/register' , Register);


module.exports = AuthRouter;