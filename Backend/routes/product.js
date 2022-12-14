const express = require("express");
const AdminJwt = require("../middlewares/AdminJwt");
const uploadImages = require("../middlewares/Upload");
const {
  create,
  getAll,
  Delete,
  Update,
  ReadProduct,
} = require("../controllers/productController");
const {
  ProductValidation,
  ProductValidationResult,
} = require("../middlewares/validations/ProductValidations");
const Pagination = require("../middlewares/Pagination");
const ProductRouter = express.Router();
const Product = require("../models/product");

//get all products with pagination
ProductRouter.get("/", AdminJwt, Pagination(Product,undefined,"category"), getAll);

//create new pordutc
ProductRouter.post(
  "/create",
  uploadImages.fields([
    { name: "mainImage" },
    { name: "gallery", maxCount: 10 },
  ]),
  ProductValidation,
  ProductValidationResult,
  AdminJwt,
  create
);

//Delete product
ProductRouter.delete("/:id", AdminJwt, Delete);
//updated Product
ProductRouter.put(
  "/:id",
  uploadImages.fields([
    { name: "mainImage" },
    { name: "gallery", maxCount: 10 },
  ]),
  AdminJwt,
  Update
);

//Read Single product 
ProductRouter.get('/:id',AdminJwt , ReadProduct);

module.exports = ProductRouter;
