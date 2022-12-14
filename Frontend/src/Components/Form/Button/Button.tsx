import {ButtonProps} from './Button.types';
import './Button.scss';

function Button({title , onClick , type ,size , className , icon} : ButtonProps) {
  return (
    <button className={` btn btn-${type} size-${size} ${className} flex items-center`} onClick={(e) => onClick(e)}>
        {icon&&<span className='mr-2'>{icon}</span>}
        {title}
    </button>
  )
}

export default Button