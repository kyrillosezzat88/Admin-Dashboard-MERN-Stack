import './Card.scss';
import { CardProps } from './Card.types';
function Card({icon , title , price , currency , bg_color} : CardProps) {
  return (
    <div className='card' style={{backgroundColor:bg_color}}>
        {icon&&icon}
        <p className='title'>{title}</p>
        <p className='price'>{price} {currency}</p>
    </div>
  )
}

export default Card