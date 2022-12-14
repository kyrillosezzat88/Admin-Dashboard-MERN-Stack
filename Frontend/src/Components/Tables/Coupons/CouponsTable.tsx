import Paginations from "../../Paginations/Paginations"
import { CouponsTableProps } from "./Coupons.types"

const CouponsTable = ({ data }: CouponsTableProps) => {
    return (
        <>
            <div className="GeneralTable">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>START DATE</th>
                            <th>END DATE</th>
                            <th>CAMPAIGNS NAME</th>
                            <th>CODE</th>
                            <th>PERCENTAGE</th>
                            <th>PRODUCTS TYPE</th>
                            <th>STATUS</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(itm =>
                            <tr>
                                <td>{itm.id}</td>
                                <td>{itm.start_date.toDateString()}</td>
                                <td>{itm.end_date.toDateString()}</td>
                                <td>{itm.name}</td>
                                <td>{itm.code}</td>
                                <td>{itm.percentage}</td>
                                <td>{itm.product_type}</td>
                                <td>{itm.status}</td>
                                <td>{itm.actions}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <Paginations total_pages={19} total_records={190} current={1} totalRecords={3} />
        </>
    )
}

export default CouponsTable