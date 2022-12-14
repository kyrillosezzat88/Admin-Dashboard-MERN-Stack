const {check , validationResult} = require('express-validator')

exports.OrderValidation = [
    // check('user').notEmpty().withMessage("Please login again"),
    check('shippingAddress').notEmpty().withMessage("Shipping Address Required"),
    check('city').notEmpty().withMessage("city Required"),
    check('phone').notEmpty().withMessage("Phone Number Required").isNumeric().withMessage("Invalid Phone number").isLength({max:11}).withMessage("Invalid Phone number"),
    check('orderItems').notEmpty().withMessage("Please add some product to cart!").isArray({min:1}).withMessage("Please add at least one product to cart !")
]

exports.OrderValidationResult = (req , res , next) => {
    const error = validationResult(req).array();
    if(error.length) return res.status(403).json({error:error[0].msg})
    next()
}