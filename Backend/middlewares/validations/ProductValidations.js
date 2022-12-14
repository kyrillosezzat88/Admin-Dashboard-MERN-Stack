const {check , validationResult} = require('express-validator');

exports.ProductValidation = [
    check('title').notEmpty().withMessage("Title Required"),
    check('description').notEmpty().withMessage("Description Required"),
    check('basePrice').notEmpty().withMessage("basePrice Required").isNumeric().withMessage("basePrice must be number"),
    check('salePrice').notEmpty().withMessage("salePrice Required").isNumeric().withMessage("salePrice must be number"),
    check('category').notEmpty().withMessage("category required"),
    // check('mainImage').notEmpty().withMessage("mainImage Required").isString().withMessage('mainImage invalid'),
    check('Stock').notEmpty().withMessage("Stock required").isNumeric().withMessage('Stock Must be number'),
    check('sku').notEmpty().withMessage("sku required"),
]

exports.ProductValidationResult = (req , res , next) => {
    const error = validationResult(req).array();
    if(error.length) return res.status(403).json({error:error[0].msg})
    next()
}