import Notification from './Notification';
import { NotificationsProps } from './Notifications.types';
import './Notifications.scss';
import {FiX} from 'react-icons/fi'

function Notifications({data}:NotificationsProps) {
  return (
    <div className={`notifications ${data.length < 7 && "overflow-hidden" }`} onClick={(e) => e.stopPropagation()}>
      {data.map((notifi , index) => (
        <Notification id={notifi.id} key={index} title={notifi.title} img={notifi.img} date={notifi.date}  status={notifi.status} body={notifi.body} status_type={notifi.status_type} actions={ <FiX color={"#0E9F6E"} />} />
      ))}
    </div> 
  )
}

export default Notifications