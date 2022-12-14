import { ChangeEvent } from "react"

export type SelectTypes = {
    options:{
        title:string,
        _id:string | number
    }[],
    className?:string
    title:string,
    label?:string,
    onChange?:(e:ChangeEvent<HTMLSelectElement>) => void,
    field?:any,
    error?:string,
    value?:string | number
}
