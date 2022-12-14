import { MouseEvent, ReactNode } from "react"

export type ModelProps = {
    title:string,
    description?:string,
    actionFun?:(e:MouseEvent<HTMLButtonElement>) => void,
    closeModel?:(e:MouseEvent<HTMLButtonElement>) => void,
    icon?:ReactNode,
    isLoading:boolean
}