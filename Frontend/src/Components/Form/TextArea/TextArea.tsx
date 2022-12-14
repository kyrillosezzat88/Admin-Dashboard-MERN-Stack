import { useEffect } from 'react'
import { TextAreaProps } from "./TextArea.types"
import './TextArea.scss'
import Label from "../Label/Label"
function TextArea({ name, id, rows, cols, className, Placeholder, error, field, value }: TextAreaProps) {
    useEffect(() => console.log({ ...field, in: value }))
    return (
        <div className='Filed_Container'>
            <div className="Field">
                <Label htmlfor='Product_desc' className='AddProduct_form_title' label='Product Description' />
                <textarea
                    className={`${className} ${error&&"Field_error"}`}
                    placeholder={Placeholder}
                    name={name}
                    id={id}
                    cols={cols}
                    rows={rows}
                    {...field}
                    value={value}
                    onChange={(e) => field.onChange(e)}
                ></textarea>
            </div>
            {error && (
                <div className="error text-red-600 text-sm mt-2 w-2/3 ml-auto">{error}</div>
            )}
        </div>
    )
}

export default TextArea