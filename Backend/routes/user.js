const express = require('express');
const { getAllUsers, DeleteUser, EditUser, deleteUSer } = require('../controllers/userController');
const AdminJWT = require('../middlewares/AdminJwt');
const Pagination = require('../middlewares/Pagination');
const user = require('../models/user');
const UserRouter = express.Router();

// get All users 
UserRouter.get('/', AdminJWT , Pagination(user) , getAllUsers);
//Deelte USer 
UserRouter.post('/:id' , AdminJWT , DeleteUser);
//edit user 
UserRouter.put('/:id',AdminJWT ,EditUser);
//Delete user 
UserRouter.delete('/:id' , AdminJWT , deleteUSer)

module.exports = UserRouter