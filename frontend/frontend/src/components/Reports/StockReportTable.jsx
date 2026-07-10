import { useEffect, useState } from "react";
import api from "../../api/axios";

function StockReportTable() {

    const [products, setProducts] = useState([]);

    useEffect(() => {

        loadProducts();

    }, []);

    const loadProducts = async () => {

        try {

            const response = await api.get("/reports/stock");

            setProducts(response.data);

        } catch (err) {

            console.log(err);

        }

    };

    return (

        <div className="card shadow mb-4">

            <div className="card-header">

                <h5>Stock Report</h5>

            </div>

            <div className="card-body">

                <table className="table table-striped">

                    <thead>

                        <tr>

                            <th>Name</th>
                            <th>Brand</th>
                            <th>Stock</th>
                            <th>Minimum</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            products.map((product) => (

                                <tr key={product.id}>

                                    <td>{product.name}</td>

                                    <td>{product.brand}</td>

                                    <td>{product.stock}</td>

                                    <td>{product.minimum_stock}</td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default StockReportTable;