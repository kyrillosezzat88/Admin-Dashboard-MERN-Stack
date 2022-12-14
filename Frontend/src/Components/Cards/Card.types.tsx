import { ReactNode } from "react"

export type CardProps = {
    title:string,
    icon?:ReactNode,
    price:number,
    currency:string,
    bg_color?:string
}