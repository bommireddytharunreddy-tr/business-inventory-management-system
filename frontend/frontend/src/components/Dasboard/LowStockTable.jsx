import { useEffect, useState } from "react";
import api from "../../api/axios";

function LowStockTable() {

    const [products, setProducts] = useState([]);

    useEffect(() => {

        loadProducts();

    }, []);

    const loadProducts = async () => {

        try {

            const response = await api.get(
                "/dashboard/low-stock"
            );

            setProducts(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="card shadow mt-4">

            <div className="card-header bg-danger text-white">

                <h5 className="mb-0">
                    Low Stock Products
                </h5>

            </div>

            <div className="card-body">

                <table className="table table-bordered">

                    <thead>

                        <tr>

                            <th>Name</th>

                            <th>Brand</th>

                            <th>Stock</th>

                            <th>Minimum Stock</th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            products.length === 0 ?

                                (
                                    <tr>

                                        <td
                                            colSpan="4"
                                            className="text-center"
                                        >

                                            No Low Stock Products

                                        </td>

                                    </tr>
                                )

                                :

                                (

                                    products.map(product => (

                                        <tr key={product.id}>

                                            <td>{product.name}</td>

                                            <td>{product.brand}</td>

                                            <td>{product.stock}</td>

                                            <td>{product.minimum_stock}</td>

                                        </tr>

                                    ))

                                )
                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default LowStockTable;