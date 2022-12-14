import { useEffect, useState, useRef } from "react"
import { useParams } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Logo from '../../Assets/Img/Logo-2.png'
import { OrderDetailsApi } from "../../Apis/OrderApis";
import { HandleAxiosError } from "../../utils/HandleAxiosErrors";
import { useDashboard } from "../../Context/AppContext";
import './Invoice.scss';
import InvoiceTable from "../../Components/Tables/InvoiceTable/InvoiceTable";
import Spinner from "../../Components/Spinner/Spinner";
import ReactToPrint from 'react-to-print';
import {FiDownloadCloud , FiPrinter} from 'react-icons/fi'
const Invoice = () => {
    const { authDispatch }: any = useDashboard()
    const { id } = useParams()
    const [OrderDetails, setOrderDetails] = useState<any | null>(null);
    const PrintRef = useRef(null)
    useEffect(() => {
        (async () => {
            await OrderDetailsApi(id).then(res => {
                setOrderDetails(res.data.data);
                console.log(res.data.data)
            }).catch(err => HandleAxiosError(err, authDispatch))
        })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <section className="defaultPage Invoice">
            <Sidebar />
            <div className="w-full">
                <Navbar />
                {OrderDetails ?
                    <div className="content">
                        <h2 className='PageTitle'>Invoice</h2>
                        <div ref={PrintRef}>
                            <div className="Invoice_content ">
                                <div className="flex justify-start md:justify-between flex-wrap  ">
                                    <div className="text-left mb-4 sm:mb-0 w-full sm:w-1/2">
                                        <h2 className="font-bold text-xl uppercase">Invoice</h2>
                                        <p className="text-sm mt-1 text-gray-500 font-bold">status: <span className={`capitalize ${OrderDetails.status}`}>{OrderDetails.status}</span></p>
                                    </div>
                                    <div className="flex flex-col sm:items-end flex-wrap  w-full sm:w-1/2 items-start">
                                        <img src={Logo} alt="E-shop" width='110' />
                                        <p className="text-sm text-gray-500  mt-2">E-shop,Cairo,Egypt</p>
                                    </div>
                                </div>
                                <div className="flex justify-center sm:justify-between flex-wrap my-6">
                                    <div className="w-full md:w-1/3">
                                        <p>Date</p>
                                        <span className="text-sm text-gray-500 block">{new Date(OrderDetails.createdAt).toDateString()}</span>
                                    </div>
                                    <div className="w-full md:w-1/3 my-4 md:my-0">
                                        <p>INVOICE NO</p>
                                        <span className="text-sm text-gray-500 block">#{OrderDetails.orderID}</span>
                                    </div>
                                    <div className="w-full md:w-1/3">
                                        <p className="md:text-right">INVOICE TO.</p>
                                        <div className="text-sm text-gray-500 flex flex-col md:text-right">
                                            <span>{OrderDetails.user.firstName} {OrderDetails.user.lastName}</span>
                                            <span>{OrderDetails.shippingAddress}</span>
                                            <span>{OrderDetails.city}</span>
                                        </div>
                                    </div>
                                </div>
                                <InvoiceTable data={OrderDetails.orderItems} />
                                <div className="TotalPrice flex justify-between flex-wrap mt-6 border rounded-xl border-gray-100 p-8 py-6 bg-gray-50 ">
                                    <div className="w-full md:w-1/4">
                                        <h2 className="TotalPrice_Title">Payment Method</h2>
                                        <span className="TotalPrice_subtitle">COD</span>
                                    </div>
                                    <div className="w-full md:w-1/4">
                                        <h2 className="TotalPrice_Title">SHIPPING COST</h2>
                                        <span className="TotalPrice_subtitle">40 EG</span>
                                    </div>
                                    <div className="w-full md:w-1/4">
                                        <h2 className="TotalPrice_Title">DISCOUNT</h2>
                                        <span className="TotalPrice_subtitle">0 EG</span>
                                    </div>
                                    <div className="w-full md:w-1/4">
                                        <h2 className="TotalPrice_Title">TOTAL PRICE</h2>
                                        <span className="TotalPrice_subtitle" >{OrderDetails.totalPrice} EG</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between flex-wrap md:flex-nowrap">
                            <a className="btn btn-primary items-center w-full md:w-1/2 " href={`http://localhost:5000/api/v1/invoice/pdf/${OrderDetails._id}`}>
                                <FiDownloadCloud />
                                <span className="ml-2">Download Invoice</span>
                            </a>
                            <ReactToPrint
                                trigger={() => { return <button className="btn btn-primary items-center w-full md:w-1/2">
                                    <FiPrinter />
                                    <span className="ml-2">Print Invoice</span>
                                </button>
                                }}
                                content={() => PrintRef.current}
                                documentTitle={`Invoice-${OrderDetails.orderID}`}
                            />
                        </div>
                    </div>
                    : <Spinner />
                }
            </div>
        </section>
    )
}

export default Invoice