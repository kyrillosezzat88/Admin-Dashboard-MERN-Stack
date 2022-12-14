const path = require('path')
const pdf = require ('html-pdf');
const Twig = require('twig')
const OrderModel = require('../models/order');
const fs = require('fs')


// Create Pdf for invoice 
const InvoicePdf = async (req , res) => {
    try {
        const {id} = req.params;
        let getOrder = await OrderModel.findById(id).populate({path:'orderItems' , populate:{path:"product"}}).populate('user' ,'firstName lastName');
        getOrder.logo = `${req.protocol}://${req.get("host")}/public/uploads/Logo-2.png`;
        if(!getOrder) return res.status(404).json({success:false , message:"No Order Found !"});
        Twig.renderFile(path.join(__dirname , '../Templates/Invoice.html.twig') ,getOrder , (err,html) => {
            if(err) return res.status(500).json({success:false , message:"PDF not Created !!"});
            var options = {
                header: {
                    'height': '8mm',
                    'contents': '<div style="text-align: center; background-color: white; color: white; height: 100%"></div>'
                },
                footer: {
                    'height': '8mm',
                    'contents': '<div style="text-align: center; background-color: white; color: white; height: 100%"></div>'
                }
            }
            pdf.create(html , options).toFile(`Pdf/Invoice-${getOrder.orderID}.pdf` , err => {
                if(err) return res.status(500).json({success:false , message:"PDF not Created !"});
                let filePath = `Pdf/Invoice-${getOrder.orderID}.pdf`;
                res.download(filePath);
                setTimeout(function () {
                    fs.unlinkSync(filePath);
                }, 3000);
            })
        })
    } catch (error) {
        return res.status(500).json({success:false , message:"Something went wrong !"})
    }
}

module.exports = {
    InvoicePdf
}
