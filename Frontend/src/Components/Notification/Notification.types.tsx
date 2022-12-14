import { MouseEvent, ReactNode } from "react"

export type NotificationProps = {
    id:number,
    title:string,
    body?:string,
    date:Date,
    img:string,
    status?:string,
    status_type?:"error" | "success",
    onClick?:(e:MouseEvent<HTMLButtonElement>) => void,
    actions?:ReactNode,
}