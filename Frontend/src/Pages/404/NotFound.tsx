import Navbar from "../../Components/Navbar/Navbar"
import Sidebar from "../../Components/Sidebar/Sidebar"
import NotFoundIMG from '../../Assets/Img/404.svg'
import { Link } from "react-router-dom"
const NotFound = () => {
    return (
        <section className="defaultPage NotFound">
            <Sidebar />
            <div className="w-full">
                <Navbar />
                <div className="content flex justify-center items-center flex-col h-[calc(100%-70px)]">
                    <img src={NotFoundIMG} alt="Not Found" width='650px' height='450px' />
                    <h2 className="font-bold font-serif font-2xl lg:text-4xl leading-7 mb-4 mt-2">Oops Page Not Found ! </h2>
                    <Link to='/'><button className="btn btn-primary">Go Home</button></Link>
                </div>
            </div>
        </section>
    )
}

export default NotFound