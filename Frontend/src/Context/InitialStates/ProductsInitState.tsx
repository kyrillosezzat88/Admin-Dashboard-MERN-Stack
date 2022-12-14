export type ProductTypes = {
    isLoading: boolean,
    products:{
        _id:string,
        title:string,
        description:string
        mainImage:string,
        gallery:[string],
        basePrice:number,
        salePrice:number,
        category:string,
        Stock:number,
        sku:string,
        published:boolean
    }[],
    TotalPages:number,
    TotalRecords:number,
    currentPage:number
}

export const ProductsInitState:ProductTypes = {
    isLoading:false,
    products:[],
    TotalPages:0,
    TotalRecords:0,
    currentPage:0
}