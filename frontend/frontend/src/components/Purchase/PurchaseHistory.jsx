import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

function PurchaseHistory({ purchases, handleDelete }) {

    const confirmDelete = (id) => {

        Swal.fire({
            title: "Delete Purchase?",
            text: "This purchase will be deleted permanently.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Delete"
        }).then((result) => {

            if (result.isConfirmed) {
                handleDelete(id);
            }

        });

    };

    return (

        <div className="card shadow-sm mt-4">

            <div className="card-header bg-dark text-white">

                <h5 className="mb-0">
                    Purchase History
                </h5>

            </div>

            <div className="card-body">

                <div className="table-responsive">

                    <table className="table table-bordered table-hover">

                        <thead className="table-light">

                            <tr>

                                <th>ID</th>
                                <th>Supplier</th>
                                <th>Date</th>
                                <th>Total Amount</th>
                                <th>No. of Items</th>
                                <th>Action</th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                purchases.length === 0 ?

                                    (

                                        <tr>

                                            <td
                                                colSpan="6"
                                                className="text-center"
                                            >

                                                No Purchases Found

                                            </td>

                                        </tr>

                                    )

                                    :

                                    (

                                        purchases.map((purchase) => (

                                            <tr key={purchase.id}>

                                                <td>{purchase.id}</td>

                                                <td>
                                                    {purchase.supplier_id}
                                                </td>

                                                <td>
                                                    {
                                                        new Date(
                                                            purchase.purchase_date
                                                        ).toLocaleDateString()
                                                    }
                                                </td>

                                                <td>
                                                    ₹ {purchase.total_amount}
                                                </td>

                                                <td>
                                                    {
                                                        purchase.items.length
                                                    }
                                                </td>

                                                <td>

                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() =>
                                                            confirmDelete(
                                                                purchase.id
                                                            )
                                                        }
                                                    >

                                                        <FaTrash />

                                                    </button>

                                                </td>

                                            </tr>

                                        ))

                                    )

                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

}

export default PurchaseHistory;