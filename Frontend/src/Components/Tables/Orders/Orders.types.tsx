export type OrderProps = {
    data:{
        orders:{
            _id:string,
            orderID:string,
            user:string,
            phone:number,
            shippingAddress:string,
            totalPrice:number,
            status:string,
            createdAt:string
        }[],
        TotalRecords:number,
        TotalPages:number,
        currentPage:number,
    }
}