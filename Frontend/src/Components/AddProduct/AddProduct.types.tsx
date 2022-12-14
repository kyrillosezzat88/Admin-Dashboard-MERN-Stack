export type AddProductProps = {
    _id:string,
    title:string,
    description:string
    mainImage:string,
    gallery?:{
        File:File
    }[] | any,
    basePrice:number,
    salePrice:number,
    category:{
        _id:string,
        title:string
    },
    Stock:number,
    sku:string,
    published:boolean,
    product_tag?:[string],
    unit:string,
    status?: string | undefined,
    discount?: number | undefined,
}

export type PropsType = {
    AnimateAddProduct:Boolean,
    HandleAddProductAnimi:Function,
    data?:AddProductProps|null
}