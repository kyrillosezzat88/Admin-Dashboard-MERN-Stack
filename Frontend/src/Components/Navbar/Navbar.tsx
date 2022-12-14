import Profile from '../../Assets/Img/Profile.png';
import './Navbar.scss';
import { FiBell, FiMenu } from 'react-icons/fi'
import Notifications from '../Notification/Notifications';
import { useEffect, useState, MouseEvent } from 'react';
import { useDashboard } from '../../Context/AppContext';
import { OpenMenuAction } from '../../Context/Actions/AuthActions/AuthActions';
function Navbar() {
  const {authDispatch}:any = useDashboard()
  const [showNotifications, setShowNotifications] = useState<Boolean>(false);
  const [isMobile , setIsMobile] = useState<Boolean>(false)
  useEffect(() => {
    // to close notifications menu when click on anywhere in window
    const HandleNotifications: EventListener = (e: Event) => {
      setShowNotifications(false);
    }
    window.addEventListener("click", HandleNotifications);
  }, [showNotifications]);
  //check if website opened on mobile or desktop to show the menu 
  useEffect(() => {
    if (/Android|iPhone/i.test(navigator.userAgent)) {
      setIsMobile(true)
    }
  },[isMobile]);

  // handle Open Menu 
  const HandleOpenMenu = (e:any) => {
    e.stopPropagation()
    authDispatch(OpenMenuAction(true))
  }
  const notifcations = [
    {
      id: 1,
      title: "new notifications ",
      date: new Date(),
      img: "https://cdn.pixabay.com/photo/2020/05/26/09/32/product-5222398_960_720.jpg",
      status: "stock Out",
    },
    {
      id: 2,
      title: "new notifications ",
      date: new Date(),
      img: "https://cdn.pixabay.com/photo/2020/05/26/09/32/product-5222398_960_720.jpg",
      status: "stock Out",
    },
    {
      id: 1,
      title: "new notifications ",
      date: new Date(),
      img: "https://cdn.pixabay.com/photo/2020/05/26/09/32/product-5222398_960_720.jpg",
      status: "stock Out",
    },
    {
      id: 2,
      title: "new notifications ",
      date: new Date(),
      img: "https://cdn.pixabay.com/photo/2020/05/26/09/32/product-5222398_960_720.jpg",
      status: "stock Out",
    },

  ]
  const HandleNotificationMenu = (e: MouseEvent): void => {
    e.stopPropagation();
    setShowNotifications(!showNotifications)
  }
  return (
    <nav className='Navbar'>
      {showNotifications && <Notifications data={notifcations} />}
      <div className='flex items-center justify-between' >
        {isMobile&&<FiMenu className="md:hidden" onClick={HandleOpenMenu} />}
        <div className="flex items-center justify-end w-full">
          <div className="notification_count" onClick={HandleNotificationMenu}>
            <FiBell size={22} color='#0E9F6E' />
            <span>5</span>
          </div>
          <img src={Profile} alt="profile" className='ProfileIMG' />
        </div>
      </div>
    </nav>
  )
}

export default Navbar