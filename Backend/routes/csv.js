const express = require('express');
const { createCSV } = require('../controllers/CsvController');
const AdminJwt = require('../middlewares/AdminJwt');
const csvRouter = express.Router();

csvRouter.get('/download' , createCSV);

module.exports = csvRouter;