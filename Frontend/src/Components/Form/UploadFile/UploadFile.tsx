import { UploadFileProps } from './UploadFiles.types'
import './UploadFile.scss';
import Label from '../Label/Label';

function UploadFile({ title, subtitle, icon, className, onChange, field, error, value, label, multi }: UploadFileProps) {

  return (
    <div className='Upload_Container'>
      {label && <Label label={label} htmlfor='UploadFile' />}
      <div className={`UploadFile ${className}`}>
        <label htmlFor="UploadFile" className=' flex flex-col justify-center items-center cursor-pointer'>
          {icon && icon}
          <h2 className='title'>{title}</h2>
          <p className='subtitle'>{subtitle}</p>
        </label>
        <input type="file" id='UploadFile' accept=".jpg, .jpeg, .png" multiple={multi}  className='hidden' {...field} value={value} onChange={(e) => onChange && onChange(e)} />
        {error && (
          <div className="error text-red-600 font-bold mt-2 w-2/3 ml-auto">{error}</div>
        )}
      </div>
    </div>
  )
}

export default UploadFile