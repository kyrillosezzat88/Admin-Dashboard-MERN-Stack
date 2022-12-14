import { AddProductProps } from "../../../Components/AddProduct/AddProduct.types"
import { ProductTypes } from "../../InitialStates/ProductsInitState"
import { createProduct, DeleteProduct, getAllProduct, isLoading, updateProduct } from "./ProductActions-types"



// Loading 
export const isLoadingAction = (loading:boolean) => {
    return {
        type: isLoading,
        payload:loading
    }
} 
//get all Products 
export const getAllProductAction = (products:ProductTypes) => {
    return {
        type:getAllProduct,
        payload:products
    }
}

//Create nwe product 
export const createProductAction = (product:AddProductProps) => {
    return{
        type:createProduct,
        payload:product
    }
}

//update Product 
export const updateProductAction = (product:ProductTypes) => {
    return{
        type:updateProduct,
        payload:product
    }
}

//Delete Product 
export const DeleteProductAction = (id:string) => {
    return{
        type:DeleteProduct,
        payload:id
    }
}
