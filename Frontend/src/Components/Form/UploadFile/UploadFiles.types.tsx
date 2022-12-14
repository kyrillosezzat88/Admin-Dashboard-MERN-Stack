import { ChangeEvent, ReactNode } from "react"

export type UploadFileProps = {
    title?:string,
    subtitle?:string,
    icon?:ReactNode,
    onChange?:(e:ChangeEvent<HTMLInputElement|any>) => void,
    className?:string,
    field:any,
    error?:string,
    value?:any,
    label?:string,
    multi?:boolean,
    
}