import { ActionsProps } from "../Actions/ActionProps.types";
import { createProduct, DeleteProduct, getAllProduct, isLoading, updateProduct } from "../Actions/ProductActions/ProductActions-types";
import { ProductTypes } from "../InitialStates/ProductsInitState";

export const ProductReducer = (state: ProductTypes, action: ActionsProps) => {
    switch (action.type) {
        case isLoading:
            return {
                ...state,
                isLoading: action.payload
            }
        case getAllProduct:
            return {
                ...state,
                products: action.payload.data,
                TotalPages: action.payload.TotalPages,
                TotalRecords: action.payload.TotalRecords,
                currentPage: action.payload.currentPage,
                isLoading: false
            }
        case createProduct:
            let newProductArr = [action.payload , ...state.products];
            let newCurrentPage = Math.ceil(newProductArr.length / 10);
            return {
                ...state,
                products: newProductArr.slice(0,10), // get last 10 items 
                TotalRecords: state.TotalRecords + 1,
                TotalPages:newCurrentPage > state.TotalPages ? newCurrentPage : state.TotalPages ,
                isLoading:false
            }
        case updateProduct:
            return {
                ...state,
                products:state.products.map(product => product._id === action.payload._id ? action.payload : product),
                isLoading:false
            }
        case DeleteProduct:
            return{
                ...state,
                products:state.products.filter(pro => pro._id !== action.payload),
                TotalRecords: state.TotalRecords - 1,
                isLoading:false
            }
        default:
            return state;
    }
}