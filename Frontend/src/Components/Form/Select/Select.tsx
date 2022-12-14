import { SelectTypes } from "./Select.types"
import './Select.scss';
import Label from "../Label/Label";
function Select({ options, className, title, label, field, error, onChange , value }: SelectTypes) {
  return (
    <div className="Select_Container">
      {label && <Label label={label} htmlfor='category' className='Field_title' />}
      <select
        className={`${className} ${error && "error"}`}
        id='category'
        {...field}
        value={field ? field.value._id : value}
        onChange={(e) => field ? field.onChange(e) : onChange&&onChange(e)}
      >
        <option selected  className="hidden">{title}</option>
        {options.map((opt, indx) => <option key={indx} value={opt._id} >{opt.title}</option>)}
      </select>
      {error && (
        <div className="error text-red-600 text-sm mt-2 w-2/3 ml-auto">{error}</div>
      )}
    </div>
  )
}

export default Select