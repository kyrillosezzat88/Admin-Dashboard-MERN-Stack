import { ChangeEvent } from "react"

export type TextAreaProps = {
    cols:number,
    rows:number,
    name?:string,
    id?:string,
    onChange?:(e:ChangeEvent<HTMLTextAreaElement>) => void,
    className?:string,
    Placeholder?:string,
    error?:string,
    field?:any,
    value?:string
}