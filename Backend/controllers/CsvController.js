const Path = require('path');
const csvWrite = require('csv-writer');
const OrderModel = require('../models/order');
const fs = require('fs')


const createCSV = async (req , res) => {
    try {
        const ordersData = await OrderModel.find().populate({path:'orderItems' , populate:{path:"product" , select:"title salePrice"}}).populate('user' ,'firstName lastName');
        if(!ordersData) return res.status(500).json({success:false , message:"Something went wrong !"});
        // create new object wth nested objects 
        let csvOrderData = ordersData.map(order => {return {...order._doc , createdAt:new Date(order.createdAt).toDateString() , firstName:order.user.firstName , lastName:order.user.lastName}}); 
        let csvPath = Path.resolve(`Pdf/Orders-${new Date().getTime()}.csv`)
        const writer = csvWrite.createObjectCsvWriter({
            path: csvPath,
            header:[
                { id: '_id', title: 'ID' },
                { id: 'firstName', title: 'FIRST NAME' },
                { id: 'lastName', title: 'LAST NAME' },
                { id: "orderItems" , title:"ORDER ITEMS" },
                { id: 'shippingAddress', title: 'SHIPPING ADDRESS	' },
                { id: 'phone', title: 'PHONE' },
                { id: 'shippingCost:', title: 'SHIPPING COST' },
                { id: 'totalPrice', title: 'TOTAL PRICE' },
                { id: 'status', title: 'STATUS' },
                { id: 'createdAt', title: 'CREATED' },
            ],
        });
        await writer.writeRecords(csvOrderData);
        res.download(csvPath);
        setTimeout(function () {
            fs.unlinkSync(csvPath);
        }, 3000);

    } catch (error) {
        return res.status(500).json({success:false , message:error.message})
    }
}

module.exports = {
    createCSV
};