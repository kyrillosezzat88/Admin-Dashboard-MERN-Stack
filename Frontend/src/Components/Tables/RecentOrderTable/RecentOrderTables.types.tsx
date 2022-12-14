import { ReactNode } from "react"

export type RecentTableprops = {
    data:{
        _id:string,
        orderID:string,
        user:string,
        phone:number,
        shippingAddress:string,
        totalPrice:number,
        status:string,
        createdAt:string
    }[]
}