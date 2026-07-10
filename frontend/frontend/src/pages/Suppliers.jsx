import { useEffect, useState } from "react";
import {
    getSuppliers,
    createSupplier,
    updateSupplier,
    deleteSupplier,
} from "../services/supplierService";

function Suppliers() {

    const [suppliers, setSuppliers] = useState([]);

    const [form, setForm] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
    });

    const [editingId, setEditingId] = useState(null);

    const loadSuppliers = async () => {
        try {
            const res = await getSuppliers();
            setSuppliers(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        loadSuppliers();
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editingId) {
                await updateSupplier(editingId, form);
            } else {
                await createSupplier(form);
            }

            setForm({
                name: "",
                phone: "",
                email: "",
                address: "",
            });

            setEditingId(null);
            loadSuppliers();

        } catch (err) {
            console.log(err);
        }
    };

    const handleEdit = (supplier) => {

        setEditingId(supplier.id);

        setForm({
            name: supplier.name,
            phone: supplier.phone,
            email: supplier.email,
            address: supplier.address,
        });
    };

    const handleDelete = async (id) => {

        if (!window.confirm("Delete this supplier?")) return;

        try {
            await deleteSupplier(id);
            loadSuppliers();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="container mt-4">

            <h2 className="mb-4">Suppliers</h2>

            <div className="card mb-4">
                <div className="card-body">

                    <form onSubmit={handleSubmit}>

                        <div className="row">

                            <div className="col-md-3 mb-3">
                                <input
                                    className="form-control"
                                    name="name"
                                    placeholder="Supplier Name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-3 mb-3">
                                <input
                                    className="form-control"
                                    name="phone"
                                    placeholder="Phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-3 mb-3">
                                <input
                                    className="form-control"
                                    name="email"
                                    placeholder="Email"
                                    value={form.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-3 mb-3">
                                <input
                                    className="form-control"
                                    name="address"
                                    placeholder="Address"
                                    value={form.address}
                                    onChange={handleChange}
                                />
                            </div>

                        </div>

                        <button className="btn btn-primary">
                            {editingId ? "Update Supplier" : "Add Supplier"}
                        </button>

                    </form>

                </div>
            </div>

            <div className="card">
                <div className="card-body">

                    <table className="table table-bordered table-hover">

                        <thead>

                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>

                        </thead>

                        <tbody>

                            {suppliers.map((supplier) => (

                                <tr key={supplier.id}>

                                    <td>{supplier.id}</td>
                                    <td>{supplier.name}</td>
                                    <td>{supplier.phone}</td>
                                    <td>{supplier.email}</td>
                                    <td>{supplier.address}</td>

                                    <td>

                                        <button
                                            className="btn btn-warning btn-sm me-2"
                                            onClick={() => handleEdit(supplier)}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDelete(supplier.id)}
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>
            </div>

        </div>
    );
}

export default Suppliers;