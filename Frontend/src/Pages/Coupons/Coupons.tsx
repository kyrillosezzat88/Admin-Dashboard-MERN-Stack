import Button from "../../Components/Form/Button/Button"
import Input from "../../Components/Form/Input/Input"
import Navbar from "../../Components/Navbar/Navbar"
import Sidebar from "../../Components/Sidebar/Sidebar"
import { AiFillPlusCircle } from 'react-icons/ai';
import './Coupons.scss';
import CouponsTable from "../../Components/Tables/Coupons/CouponsTable";
import { BiEdit } from 'react-icons/bi'
import { MdOutlineDeleteForever } from 'react-icons/md'
const Coupons = () => {
    const data = [
        {
            id: "284B",
            start_date: new Date(),
            end_date: new Date(),
            name: "October Gift Voucher",
            code: "OCTOBER21",
            percentage: 10,
            product_type: 'Electronics',
            status: "Active",
            actions: <div className="flex">
                <BiEdit />
                <MdOutlineDeleteForever />
            </div>
        },
        {
            id: "284B",
            start_date: new Date(),
            end_date: new Date(),
            name: "October Gift Voucher",
            code: "OCTOBER21",
            percentage: 10,
            product_type: 'Electronics',
            status: "Active",
            actions: <div className="flex">
                <BiEdit />
                <MdOutlineDeleteForever />
            </div>
        },
    ]
    return (
        <section className="Coupons">
            <Sidebar />
            <div className="w-full">
                <Navbar />
                <div className="content">
                    <h2 className='PageTitle'>Coupons</h2>
                    <div className="Coupons_filter">
                        <Input type="text" placeHolder="Search By name/email/phone" className='w-full' />
                        <Button title="Add Coupon" type="primary" onClick={(e) => { }} size="md" className="w-full md:w-1/3" icon={<AiFillPlusCircle />} />
                    </div>
                    <CouponsTable data={data} />
                </div>
            </div>
        </section>
    )
}

export default Coupons