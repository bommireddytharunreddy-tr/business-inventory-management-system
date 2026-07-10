import { useEffect, useState } from "react";
import api from "../../api/axios";

function PurchaseReportTable() {

    const [purchases, setPurchases] = useState([]);

    useEffect(() => {
        loadPurchases();
    }, []);

    const loadPurchases = async () => {

        try {

            const response = await api.get("/reports/purchases");

            setPurchases(response.data);

        } catch (err) {

            console.log(err);

        }

    };

    return (

        <div className="card shadow mb-4">

            <div className="card-header">

                <h5>Purchase Report</h5>

            </div>

            <div className="card-body">

                <table className="table table-striped">

                    <thead>

                        <tr>

                            <th>ID</th>
                            <th>Supplier</th>
                            <th>Total</th>
                            <th>Date</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            purchases.map((purchase) => (

                                <tr key={purchase.id}>

                                    <td>{purchase.id}</td>

                                    <td>{purchase.supplier_id}</td>

                                    <td>₹ {purchase.total_amount}</td>

                                    <td>

                                        {new Date(
                                            purchase.purchase_date
                                        ).toLocaleDateString()}

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default PurchaseReportTable;