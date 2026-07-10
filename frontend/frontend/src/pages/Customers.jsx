import { useEffect, useState } from "react";
import {
    getCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer,
} from "../services/customerService";

function Customers() {

    const [customers, setCustomers] = useState([]);

    const [form, setForm] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
    });

    const [editingId, setEditingId] = useState(null);

    const loadCustomers = async () => {
        try {
            const res = await getCustomers();
            setCustomers(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        loadCustomers();
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
                await updateCustomer(editingId, form);
            } else {
                await createCustomer(form);
            }

            setForm({
                name: "",
                phone: "",
                email: "",
                address: "",
            });

            setEditingId(null);
            loadCustomers();

        } catch (err) {
            console.log(err);
        }
    };

    const handleEdit = (customer) => {
        setEditingId(customer.id);

        setForm({
            name: customer.name,
            phone: customer.phone,
            email: customer.email,
            address: customer.address,
        });
    };

    const handleDelete = async (id) => {

        if (!window.confirm("Delete this customer?")) return;

        try {
            await deleteCustomer(id);
            loadCustomers();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="container mt-4">

            <h2 className="mb-4">Customers</h2>

            <div className="card mb-4">
                <div className="card-body">

                    <form onSubmit={handleSubmit}>

                        <div className="row">

                            <div className="col-md-3 mb-3">
                                <input
                                    className="form-control"
                                    name="name"
                                    placeholder="Customer Name"
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
                            {editingId ? "Update Customer" : "Add Customer"}
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

                            {customers.map((customer) => (

                                <tr key={customer.id}>

                                    <td>{customer.id}</td>
                                    <td>{customer.name}</td>
                                    <td>{customer.phone}</td>
                                    <td>{customer.email}</td>
                                    <td>{customer.address}</td>

                                    <td>

                                        <button
                                            className="btn btn-warning btn-sm me-2"
                                            onClick={() => handleEdit(customer)}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDelete(customer.id)}
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

export default Customers;