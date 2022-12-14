export type OrdersType = {
    isLoading: boolean,
    orders:{
        _id:string,
        user:string,
        phone:number,
        shippingAddress:string,
        totalPrice:number,
        status:string,
        createdAt:string
    }[],
    TotalPages:number,
    TotalRecords:number,
    currentPage:number
}

export const OrdersInitialState:OrdersType = {
    isLoading: false,
    orders:[],
    TotalPages:0,
    TotalRecords:0,
    currentPage:0
}