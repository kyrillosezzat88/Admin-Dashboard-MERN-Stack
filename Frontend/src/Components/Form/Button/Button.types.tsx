import { ReactNode } from "react"

export type ButtonProps = {
    type:"primary" | 'secondary' | 'blank',
    title:string,
    size:"sm" | "md" | "lg",
    textSize?:"sm" | "md" | "lg",
    className?:string,
    onClick: (e:React.MouseEvent<HTMLButtonElement>) => void,
    icon?:ReactNode,
    
}