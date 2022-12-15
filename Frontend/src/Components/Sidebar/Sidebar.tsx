/* eslint-disable react/jsx-pascal-case */
import {useEffect} from 'react'
import { NavLink } from "react-router-dom"
import { items } from "./SidebarItems"
import './Sidebar.scss'
import { SidebarProps } from "./Sidebar.types"
import Logo from '../../Assets/Img/Logo-2.png'
import Button from "../Form/Button/Button"
import { FiPower } from 'react-icons/fi'
import { useDashboard } from "../../Context/AppContext"
import { OpenMenuAction } from '../../Context/Actions/AuthActions/AuthActions';
import { LogoutUser } from "../../Context/Actions/AuthActions/AuthActions"
function Sidebar({ className }: SidebarProps) {
    const { authDispatch , auth }: any = useDashboard()
    const HandleLogOut = () => {
        authDispatch(LogoutUser());
    }
    const HandleOpenMenu = () => {
        setTimeout(() => {
            authDispatch(OpenMenuAction(false))
        },50)
    }
    
    useEffect(() => {
        window.addEventListener('click', HandleOpenMenu)
        setTimeout(() => {
            return window.removeEventListener('click', () => HandleOpenMenu())
        }, 1000);
     // eslint-disable-next-line
    }, []);
    return (
        <aside className={`${className} ${auth.OpenMenu ? "MenuOpened" : "MenuClosed"}`} >
            <div onClick={(e) => e.stopPropagation()}>
                <img src={Logo} alt="Bi3ly" width="135px" height="135px" className="ml-6 mb-6 sm:my-6" />
                <nav>
                    <ul>
                        {items.map(Item => (
                            <li key={Item.id} onClick={HandleOpenMenu}>
                                <NavLink to={Item.route} >
                                    <Item.icon size={22} className='mr-2' />
                                    {Item.title}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
                <Button title="Logout" type="primary" size="lg" icon={<FiPower />} onClick={HandleLogOut} />
            </div>
        </aside>
    )
}

export default Sidebar