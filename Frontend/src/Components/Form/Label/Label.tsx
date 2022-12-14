import { LabelProps } from "./Label.types"

function Label({label , htmlfor , className} : LabelProps) {
  return (
    <label htmlFor={htmlfor} className={className}>{label}</label>
  )
}

export default Label