import { InvoiceTableProps } from "./InvoiceTable.types"

const InvoiceTable = ({data}:InvoiceTableProps) => {
    return (
        <div className="GeneralTable">
            <table>
                <thead>
                    <tr>
                        <th>SR.</th>
                        <th>PRODUCT NAME</th>
                        <th>QUANTITY</th>
                        <th>ITEM PRICE</th>
                        <th>TOTAL PRICE</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((pro,index) => (
                        <tr key={index}>
                            <td>1</td>
                            <td>{pro.product.title}</td>
                            <td>{pro.quantity}</td>
                            <td>{pro.product.salePrice} EG</td>
                            <td>{pro.quantity * pro.product.salePrice} EG</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default InvoiceTable