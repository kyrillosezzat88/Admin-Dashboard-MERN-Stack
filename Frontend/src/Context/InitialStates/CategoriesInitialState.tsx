export type CategoriesProps = {
    isLoading: boolean,
    categories:{
        title:string,
        mainImage:string,
        _id:string,
        published:boolean
    }[],
    categoriesList:{
        _id:string,
        title:string
    }[],
    TotalPages:number,
    TotalRecords:number,
    currentPage:number
}

export const CategoriesInitialState:CategoriesProps = {
    isLoading: false,
    categories:[],
    categoriesList:[],
    TotalPages:0,
    TotalRecords:0,
    currentPage:0
}