export type InvoiceTableProps = {
    data:{
        product:{
            SR?:number,
            title:string,
            salePrice:number,
        },
        quantity:number
    }[]
}