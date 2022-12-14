import { ChangeEvent } from "react"

export type InputProps = {
    type:'text' | 'number' | 'email' | 'password',
    placeHolder:string,
    className?:string,
    onChange?:(e:ChangeEvent<HTMLInputElement>) => void,
    field?:any,
    labeltext?:string,
    error?:string,
    value?:string | number
}