import { RecentTableprops } from "./RecentOrderTables.types"
import '../Table.style.scss';
import { Link } from "react-router-dom";
import { FiFileText } from 'react-icons/fi'

function RecentOrderTable({ data }: RecentTableprops) {
  return (
    <>
      <div className="GeneralTable">
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
              <th>INVOICE</th>
            </tr>
          </thead>
          <tbody>
            {data.map((itm , index) =>
              <tr>
                <td>{index + 1}</td>
                <td>{itm.orderID}</td>
                <td>{new Date(itm.createdAt).toDateString()}</td>
                <td className="CustomeTD">{itm.shippingAddress}</td>
                <td>{itm.phone}</td>
                <td>{itm.totalPrice} EG</td>
                <td><span className={itm.status}>{itm.status}</span></td>
                <td><Link to={`/orders/invoice/${itm._id}`}><FiFileText /></Link></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default RecentOrderTable