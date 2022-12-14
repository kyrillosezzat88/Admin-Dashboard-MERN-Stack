const express = require('express');
const { Create, getAll, update, Delete, ListCategories } = require('../controllers/Category');
const AdminJwt = require('../middlewares/AdminJwt');
const Pagination = require('../middlewares/Pagination');
const uploadImages = require('../middlewares/Upload');
const category = require('../models/category');
const categoryRouter = express.Router();

//get all category
categoryRouter.get('/',AdminJwt,Pagination(category),getAll)
//create Category 
categoryRouter.post('/create',uploadImages.single('mainImage'),AdminJwt , Create);
// UPDATE CATEGORY 
categoryRouter.put('/:id',uploadImages.single('mainImage'),AdminJwt,update)
//Delete Category
categoryRouter.delete('/:id',AdminJwt,Delete);
// get list of categories 
categoryRouter.get('/list',AdminJwt,ListCategories)

module.exports = categoryRouter