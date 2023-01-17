import Button from "../../Components/Form/Button/Button"
import Navbar from "../../Components/Navbar/Navbar"
import Sidebar from "../../Components/Sidebar/Sidebar"
import { FiDownloadCloud, FiXCircle } from 'react-icons/fi'
import './Orders.scss';
import OrdersTable from "../../Components/Tables/Orders/OrdersTable"
import { useEffect, useState } from "react"
import { FilterOrders, OrdersApi } from "../../Apis/OrderApis"
import { useDashboard } from "../../Context/AppContext"
import { isLoadingAction, OrdersActions } from "../../Context/Actions/OrderActions/OrderActions"
import { HandleAxiosError } from "../../utils/HandleAxiosErrors"
import Select from "../../Components/Form/Select/Select"
import Spinner from "../../Components/Spinner/Spinner"

const Orders = () => {
    const { order, orderDispatch, authDispatch }: any = useDashboard();
    const [Search, setSearch] = useState<{
        orderID?: string,
        status?: "delivered" | "processing" | "pending" | "cancel"
    }>({})

    // to get all oreders 
    const getAllOrders = async () => {
        setSearch({ orderID: "" }); // to reset order search status 
        orderDispatch(isLoadingAction(true))
        await OrdersApi().then(res => {
            orderDispatch(OrdersActions(res.data))
            orderDispatch(isLoadingAction(false))
        }).catch(err => {
            HandleAxiosError(err, authDispatch)
        })
    }

    useEffect(() => {
        if (!order.orders.length) {
            getAllOrders()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Hanlde Serach 
    const HandleSearch = async ({ ...rest }) => {
        setSearch({ ...Search, ...rest });
        orderDispatch(isLoadingAction(true))
        await FilterOrders({ ...Search, ...rest }).then(res => {
            orderDispatch(OrdersActions(res.data))
            orderDispatch(isLoadingAction(false))
        }).catch(error => HandleAxiosError(error, authDispatch))
    }

    const ordersStatus = [
        {
            title: "Delivered",
            _id: "delivered"
        },
        {
            title: "Processing",
            _id: "processing"
        },
        {
            title: "Pending",
            _id: "pending"
        },
        {
            title: "Cancel",
            _id: "cancel"
        }
    ]
    return (
        <section className="defaultPage Orders">
            <Sidebar />
            <div className="w-full">
                <Navbar />
                <div className="content">
                    <h2 className='PageTitle'>Orders</h2>
                    <div className="Orders_filter">
                        <input type="text" placeholder="Search By order ID" value={Search.orderID} className="Field_input" onChange={e => HandleSearch({ orderID: e.target.value })} />
                        <Select options={ordersStatus} title="Status" value={Search.status ? Search.status : ""} onChange={e => HandleSearch({ status: e.target.value })} className='w-full' />
                        {/* <Select options={ordersStatus} title="Status" onChange={() => {}} className='w-full'  /> */}
                        <a href="https://admin-dashboard-backend-nine.vercel.app/api/v1/csv/download">
                            <Button title="Download all Orders" onClick={() => { }} textSize="sm" size="lg" icon={<FiDownloadCloud />} type="primary" />
                        </a>
                        <Button title="Clear Search" onClick={getAllOrders} textSize="sm" size="lg" icon={<FiXCircle />} type="primary" />
                    </div>
                    {order.isLoading ? <Spinner /> : <OrdersTable data={order} />}
                </div>
            </div>
        </section>
    )
}

export default Orders