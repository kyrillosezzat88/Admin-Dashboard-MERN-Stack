import { ActionsProps } from "../Actions/ActionProps.types";
import { allOrders, isLoading, updateOrder } from "../Actions/OrderActions/OrderActions-types";
import { OrdersType } from "../InitialStates/OrdersInitState";

export const OrderReducer = (state: OrdersType, action: ActionsProps) => {
    switch (action.type) {
        case isLoading:
            return {
                ...state,
                isLoading: action.payload
            }
        case allOrders:
            return {
                ...state,
                orders: action.payload.data,
                TotalPages: action.payload.TotalPages,
                TotalRecords: action.payload.TotalRecords,
                currentPage: action.payload.currentPage,
                isLoading: false
            }
        case updateOrder:
            return {
                ...state,
                orders: state.orders.map(order => order._id === action.payload._id ? action.payload : order)
            }
        default:
            return state;
    }
}