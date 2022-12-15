const OrderModel = require('../models/order');
const ProductModel = require('../models/product');
const orderItemModel = require('../models/orderItem');


// generate unque order id
function orderNumber() {
    let now = Date.now().toString(); // '1492341545873'
    // pad with extra random digit
    now += now + Math.floor(Math.random() * 10);
    // format
    return [now.slice(0, 3), now.slice(4, 10), now.slice(10, 14)].join("");
  }

//Place a new order 
const PlaceOrder = async(req , res) => {
    try {
        const {orderItems} = req.body;
        const orderItemsIds = Promise.all(
            orderItems.map(async (orderItem ) => {
                //get produc model 
                const itm = await ProductModel.findById(orderItem.product);
                if(itm.published){
                    let order = new orderItemModel({
                        quantity:orderItem.quantity ? orderItem.quantity : 1,
                        product:orderItem.product
                    });
                    if(!order) return res.status(500).json({success:false , message:"Somthing went wrong "});
                    await order.save();
                    return order._id;
                }else{
                    return res.status(402).json({success:false , message:"Product unavailable right now !!"});
                }
            })
        );
        // resolve promise of order items
        const resolveOrderItems = await orderItemsIds;
        // calucalte total price 
        const TotalPrices = Promise.all(
            resolveOrderItems.map(async(orderitemId , index) => {
                const orderPrice = await orderItemModel.findById(orderitemId).populate('product' , 'salePrice');
                return orderPrice;
            })
        )
        const resolveTotalPrices = await TotalPrices;
        const OrderTotalPrice =  resolveTotalPrices.map(pro => pro.product.salePrice * pro.quantity ).reduce((a,b) => a + b , 0)
        let newOrder = new OrderModel({...req.body , orderItems:resolveOrderItems , user:req.user._id ,shippingCost:40, totalPrice:OrderTotalPrice , orderID:orderNumber()});
        newOrder = await newOrder.save();
        if(!newOrder) return res.status(500).json({success:false , message:"Somethign went wrong !"});
        return res.status(200).json({success:true , data:newOrder})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

// get all orders 
const getAllOrders = async (req , res) => {
    return res.status(200).json(res.paginationData)
}

//upate order 
const update = async (req , res) => {
    try {
        const {id} = req.params;
        let order = await OrderModel.findByIdAndUpdate(id,req.body ,{new:true});
        if(!order) return res.status(404).json({success:false , message:"Order Not Found !!"});
        return res.status(200).json({success:true , message:"Order Updated Successfully" , data:order});
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

// get order Details 
const OrderDetails = async (req , res) => {
    try {
        const {id} = req.params;
        let getOrder = await OrderModel.findById(id).populate({path:'orderItems' , populate:{path:"product"}}).populate('user' ,'firstName lastName');
        if(!getOrder) return res.status(404).json({success:false , message:"order not found !"});
        return res.status(200).json({success:true , data:getOrder});
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

// get Today orders 
const OrdersReport = async (req , res ) => {
    try {
        // caculate total orders 
        const TotalOrders = await OrderModel.aggregate([{
            $group: {
                _id: null,
                totalAmount: { $sum: '$totalPrice' },
            }
        }]);
        // get day of year 
        let day = (date => {
            return Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24)
         })(new Date());
        //  caclulate today orders
        const TodayOrders = await OrderModel.aggregate([
            {$addFields: {  "dayOfYear" : {$dayOfYear: '$createdAt'}}},
            {$match: { dayOfYear: day}},
            { $group: {
                _id: null,
                totalAmount: { $sum: '$totalPrice' },
            }}
          ]);
          // caclulate current month orders
        const MonthOrders = await OrderModel.aggregate([
            {$addFields: {  "month" : {$month: '$createdAt'}}},
            {$match: { month: new Date().getMonth()+1}},
            { $group: {
                _id: null,
                totalAmount: { $sum: '$totalPrice' },
            }}
          ]);
        return res.status(200).json({
            success:true,
            data:{
                TodayOrders:TodayOrders[0] ? TodayOrders[0].totalAmount : 0,
                MonthOrders:MonthOrders[0] ? MonthOrders[0].totalAmount : 0,
                TotalOrders:TotalOrders[0] ? TotalOrders[0].totalAmount : 0
            }
        });
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

// recent order retuern onlu latest 4 ordeers 
const RecentOrders = async(req , res) => {
    try {
        let latestOrders = await OrderModel.find().sort({"createdAt":-1}).limit(4);
        if(!latestOrders) return res.status(500).json({success:false,message:"Something went wrong "});
        return res.status(200).json({success:true , data:latestOrders})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

module.exports = {
    PlaceOrder,
    getAllOrders,
    update,
    OrderDetails,
    OrdersReport,
    RecentOrders

}