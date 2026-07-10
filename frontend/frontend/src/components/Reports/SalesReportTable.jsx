import { useEffect, useState } from "react";
import api from "../../api/axios";

function SalesReportTable() {

    const [sales, setSales] = useState([]);

    useEffect(() => {
        loadSales();
    }, []);

    const loadSales = async () => {
        try {
            const response = await api.get("/reports/sales");
            setSales(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="card shadow mb-4">
            <div className="card-header">
                <h5>Sales Report</h5>
            </div>

            <div className="card-body">

                <table className="table table-striped">

                    <thead>

                        <tr>
                            <th>ID</th>
                            <th>Customer</th>
                            <th>Total</th>
                            <th>Date</th>
                        </tr>

                    </thead>

                    <tbody>

                        {sales.map((sale) => (

                            <tr key={sale.id}>

                                <td>{sale.id}</td>

                                <td>{sale.customer_id}</td>

                                <td>₹ {sale.total_amount}</td>

                                <td>
                                    {new Date(
                                        sale.sale_date
                                    ).toLocaleDateString()}
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default SalesReportTable;