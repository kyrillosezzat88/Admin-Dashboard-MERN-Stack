import { MiniCardprops } from './MiniCard.types'
import './MiniCard.scss';
function MiniCard({icon , title , count , bg_color} : MiniCardprops) {
  return (
    <div className='miniCard'>
        <div className='icon' style={{backgroundColor:bg_color}}>{icon}</div>
        <div>
            <p className='title'>{title}</p>
            <p className='count'>{count}</p>
        </div>
    </div>
  )
}

export default MiniCard