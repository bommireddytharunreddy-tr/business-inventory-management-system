import { FaPlus, FaTrash } from "react-icons/fa";

function PurchaseForm({
    suppliers,
    products,
    supplierId,
    setSupplierId,
    items,
    setItems,
    handleSave,
}) {

    const addItem = () => {
        setItems([
            ...items,
            {
                product_id: "",
                quantity: 1,
                purchase_price: 0,
            },
        ]);
    };

    const removeItem = (index) => {
        const updated = [...items];
        updated.splice(index, 1);
        setItems(updated);
    };

    const updateItem = (index, field, value) => {
        const updated = [...items];
        updated[index][field] = value;
        setItems(updated);
    };

    const grandTotal = items.reduce(
        (sum, item) =>
            sum + item.quantity * item.purchase_price,
        0
    );

    return (
        <div className="card shadow-sm mb-4">

            <div className="card-header bg-primary text-white">
                <h5 className="mb-0">
                    Purchase Invoice
                </h5>
            </div>

            <div className="card-body">

                <div className="mb-3">

                    <label className="form-label">
                        Supplier
                    </label>

                    <select
                        className="form-select"
                        value={supplierId}
                        onChange={(e) =>
                            setSupplierId(e.target.value)
                        }
                    >
                        <option value="">
                            Select Supplier
                        </option>

                        {suppliers.map((supplier) => (
                            <option
                                key={supplier.id}
                                value={supplier.id}
                            >
                                {supplier.name}
                            </option>
                        ))}

                    </select>

                </div>

                <table className="table table-bordered">

                    <thead>

                        <tr>
                            <th>Product</th>
                            <th width="120">Quantity</th>
                            <th width="180">
                                Purchase Price
                            </th>
                            <th width="180">
                                Total
                            </th>
                            <th width="80">
                                Action
                            </th>
                        </tr>

                    </thead>

                    <tbody>

                        {items.map((item, index) => (

                            <tr key={index}>

                                <td>

                                    <select
                                        className="form-select"
                                        value={item.product_id}
                                        onChange={(e) =>
                                            updateItem(
                                                index,
                                                "product_id",
                                                e.target.value
                                            )
                                        }
                                    >

                                        <option value="">
                                            Select Product
                                        </option>

                                        {products.map((product) => (

                                            <option
                                                key={product.id}
                                                value={product.id}
                                            >
                                                {product.name}
                                            </option>

                                        ))}

                                    </select>

                                </td>

                                <td>

                                    <input
                                        type="number"
                                        className="form-control"
                                        value={item.quantity}
                                        min="1"
                                        onChange={(e) =>
                                            updateItem(
                                                index,
                                                "quantity",
                                                Number(
                                                    e.target.value
                                                )
                                            )
                                        }
                                    />

                                </td>

                                <td>

                                    <input
                                        type="number"
                                        className="form-control"
                                        value={item.purchase_price}
                                        min="0"
                                        onChange={(e) =>
                                            updateItem(
                                                index,
                                                "purchase_price",
                                                Number(
                                                    e.target.value
                                                )
                                            )
                                        }
                                    />

                                </td>

                                <td>

                                    ₹
                                    {(
                                        item.quantity *
                                        item.purchase_price
                                    ).toFixed(2)}

                                </td>

                                <td>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() =>
                                            removeItem(index)
                                        }
                                    >
                                        <FaTrash />
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

                <button
                    className="btn btn-success mb-3"
                    onClick={addItem}
                >
                    <FaPlus className="me-2" />
                    Add Product
                </button>

                <h4 className="text-end">
                    Grand Total : ₹
                    {grandTotal.toFixed(2)}
                </h4>

                <div className="text-end">

                    <button
                        className="btn btn-primary"
                        onClick={handleSave}
                    >
                        Save Purchase
                    </button>

                </div>

            </div>

        </div>
    );
}

export default PurchaseForm;