import { Link } from "react-router-dom"
import Select from "../../Form/Select/Select"
import Paginations from "../../Paginations/Paginations"
import { OrderProps } from "./Orders.types"
import { FiFileText } from 'react-icons/fi'
import { useDashboard } from "../../../Context/AppContext"
import { OrdersActions, updateOrderAction } from "../../../Context/Actions/OrderActions/OrderActions"
import { OrdersApi, updateOrderApi } from "../../../Apis/OrderApis"
import { isLoading } from "../../../Context/Actions/OrderActions/OrderActions-types"
import { toast } from "react-toastify"
import { HandleAxiosError } from "../../../utils/HandleAxiosErrors"
import noResult from '../../../Assets/Img/no-result.svg'

const OrdersTable = ({ data }: OrderProps) => {
    const { order, orderDispatch, authDispatch }: any = useDashboard()
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
    // update order status 
    const updateOrderStatus = async (id: string, status: string) => {
        await updateOrderApi(id, { status }).then(res => {
            orderDispatch(updateOrderAction(res.data.data));
            toast(res.data.message, { type: "success" })
        }).catch(err => HandleAxiosError(err, authDispatch))
    }
    return (
        <>
            <div className="GeneralTable OrdersTable">
                <table>
                    <thead>
                        <tr>
                            <th>NO</th>
                            <th>ID</th>
                            <th>TIME</th>
                            <th>SHIPPING ADDRESS</th>
                            <th>PHONE</th>
                            <th>COST</th>
                            <th>STATUS</th>
                            <th>ACTIONS</th>
                            <th>INVOICE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.orders.map((itm, index) =>
                            <tr>
                                <td>{index + 1}</td>
                                <td>{itm.orderID}</td>
                                <td>{new Date(itm.createdAt).toDateString()}</td>
                                <td className="CustomeTD">{itm.shippingAddress}</td>
                                <td>{itm.phone}</td>
                                <td>{itm.totalPrice} EG</td>
                                <td><span className={itm.status}>{itm.status}</span></td>
                                <td>
                                    <Select options={ordersStatus} title="Status" value={itm.status} onChange={(e) => { updateOrderStatus(itm._id, e.target.value) }} />
                                </td>
                                <td><Link to={`invoice/${itm._id}`}><FiFileText /></Link></td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {!data.orders.length &&
                    <div className='flex justify-center items-center flex-col mx-auto py-3 my-3'>
                        <img src={noResult} alt="notFound" width="400px" />
                        <h1 className=' text-gray-600 capitalize  text-2xl pt-5'>Sorry, we can not find Orders 😞</h1>
                    </div>
                }
            </div>
            {data.orders.length ?
                <Paginations
                    total_pages={data.TotalPages}
                    total_records={data.TotalRecords}
                    current={data.currentPage}
                    modelDispatch={orderDispatch}
                    modelAction={OrdersActions}
                    modelApi={OrdersApi}
                    isLoadingAction={isLoading}
                    totalRecords={order.orders.length}
                />
                : null}
        </>
    )
}

export default OrdersTable