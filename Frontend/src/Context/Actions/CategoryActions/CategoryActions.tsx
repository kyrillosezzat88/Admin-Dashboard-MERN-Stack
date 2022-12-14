import { CategoryProps } from "../../../Components/AddCategory/AddCategory.types"
import { CategoriesProps } from "../../InitialStates/CategoriesInitialState"
import { categoriesList, createCategory, deleteCategory, editCategory, getCategories, isLoading } from "./CategoryActions-types"

//get all categories 
export const allCategories = (categories: CategoriesProps) => {
    return {
        type: getCategories,
        payload: categories
    }
}
//get Categories list just title and id
export const categoriesListAction = (categories:CategoryProps) => {
    return{
        type:categoriesList,
        payload:categories
    }
}
//create new category 
export const createNewCategory = (category: CategoriesProps) => {
    return {
        type: createCategory,
        payload: category
    }
}

// update category 
export const updateCategoryAction = (category: CategoriesProps) => {
    return {
        type: editCategory,
        payload: category
    }
}

//delete catgegory 
export const DeleteCategoryAction = (id: string) => {
    return {
        type: deleteCategory,
        payload: id
    }
}

// Loading 
export const isLoadingAction = (loading:boolean) => {
    return {
        type: isLoading,
        payload:loading
    }
} 