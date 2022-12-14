import '../Table.style.scss';
import Paginations from "../../Paginations/Paginations";
import { TogarProps } from './Togar.types';
function TogarTable({ data }: TogarProps) {
    return (
        <>
            <div className="GeneralTable">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>JOINING DATE</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>PHONE</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(itm =>
                            <tr>
                                <td>{itm.id}</td>
                                <td>{itm.joining.toDateString()}</td>
                                <td>{itm.name}</td>
                                <td>{itm.email}</td>
                                <td>{itm.phone}</td>
                                <td>{itm.actions}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <Paginations total_pages={19} total_records={190} current={1} totalRecords={2}  />
        </>
    )
}

export default TogarTable