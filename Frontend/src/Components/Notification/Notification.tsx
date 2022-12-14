import { NotificationProps } from "./Notification.types"
import './Notification.scss';
const Notification = ({ title, img, body, date, status , status_type ,actions }: NotificationProps) => {
  return (
    <div className="notification">
      <img className="notification_img" src={img} alt="NotificationImage" />
      <div className="notification_content">
        <h4 className="notification_content_title">{title}</h4>
        <div className="notification_content_body">
          <p className={`notification_content_body_status notification-${status_type}`} >{status}</p>
          <p className="notification_content_body_date">Dec 12 2021 - 12:40PM</p>
        </div>
      </div>
      {actions&&actions}
    </div>
  )
}

export default Notification