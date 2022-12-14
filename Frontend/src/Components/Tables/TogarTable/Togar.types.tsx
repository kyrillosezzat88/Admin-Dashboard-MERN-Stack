import {ReactNode} from 'react'
export type TogarProps = {
    data:{
        id:number,
        joining:any,
        name:string,
        email:string,
        phone:number,
        actions?:ReactNode
    }[]
}