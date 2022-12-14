import { OrdersType } from "../../InitialStates/OrdersInitState"
import { allOrders, isLoading, updateOrder } from "./OrderActions-types"


//loading 
export const isLoadingAction = (loading:boolean) => {
    return{
        type:isLoading,
        payload:loading
    }
}
//get all orders
export const OrdersActions = (orders:OrdersType) => {
    return{
        type:allOrders,
        payload:orders
    }
}

// update order 
export const updateOrderAction = (order:OrdersType) => {
    return{
        type:updateOrder,
        payload:order
    }
}