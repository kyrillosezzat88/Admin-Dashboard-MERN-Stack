import {ReactNode} from 'react'
export type CouponsTableProps = {
    data:{
        id:string,
        start_date:any,
        end_date:any,
        name:string,
        code:string,
        percentage:number,
        product_type:string,
        status:string,
        actions:ReactNode
    }[]
}