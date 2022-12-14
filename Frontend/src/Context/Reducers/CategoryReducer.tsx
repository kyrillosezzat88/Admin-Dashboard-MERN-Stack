import { ActionsProps } from "../Actions/ActionProps.types";
import { categoriesList, createCategory, deleteCategory, editCategory, getCategories, isLoading } from "../Actions/CategoryActions/CategoryActions-types";
import { CategoriesProps } from "../InitialStates/CategoriesInitialState";

export const CategoryReducer = (state: CategoriesProps, action: ActionsProps) => {
    switch (action.type) {
        case isLoading:
            return{
                ...state,
                isLoading:action.payload
            }
        case getCategories:
            return {
                ...state,
                categories: action.payload.data,
                TotalPages: action.payload.TotalPages,
                TotalRecords: action.payload.TotalRecords,
                currentPage: action.payload.currentPage,
                isLoading:false
            }
        case categoriesList: 
        return{
            ...state,
            categoriesList:action.payload
        }
        case createCategory:
            let newCategoriesArr = [action.payload , ...state.categories];
            let newCurrentPage = Math.ceil(newCategoriesArr.length / 10);
            return {
                ...state,
                categories: newCategoriesArr.slice(0,10), // get last 10 items 
                TotalRecords: state.TotalRecords + 1,
                TotalPages:newCurrentPage > state.TotalPages ? newCurrentPage : state.TotalPages ,
                isLoading:false
            }
        case editCategory:
            return {
                ...state,
                categories: state.categories.map(category => category._id === action.payload._id ? action.payload : category),
                isLoading:false
            }
        case deleteCategory:
            return {
                ...state,
                categories: state.categories.filter(category => category._id !== action.payload),
                TotalRecords: state.TotalRecords - 1,
                isLoading:false
            }
        default:
            return state;
    }
}