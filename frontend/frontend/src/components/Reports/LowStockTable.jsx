import { useEffect, useState } from "react";
import api from "../../api/axios";

function LowStockTable() {

    const [products, setProducts] = useState([]);

    useEffect(() => {

        loadProducts();

    }, []);

    const loadProducts = async () => {

        try {

            const response = await api.get("/reports/low-stock");

            setProducts(response.data);

        } catch (err) {

            console.log(err);

        }

    };

    return (

        <div className="card shadow">

            <div className="card-header bg-danger text-white">

                <h5>Low Stock Products</h5>

            </div>

            <div className="card-body">

                <table className="table">

                    <thead>

                        <tr>

                            <th>Name</th>
                            <th>Stock</th>
                            <th>Minimum</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            products.map((product) => (

                                <tr key={product.id}>

                                    <td>{product.name}</td>

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

export default LowStockTable;