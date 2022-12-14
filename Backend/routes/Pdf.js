const express = require('express');
const { InvoicePdf } = require('../controllers/PdfController');
const AdminJwt = require('../middlewares/AdminJwt');
const pdfRouter = express.Router();

pdfRouter.get('/:id' , InvoicePdf);

module.exports = pdfRouter;