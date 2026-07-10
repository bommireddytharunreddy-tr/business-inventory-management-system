import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import {
    getSettings,
    updateSettings
} from "../services/settingsService";

import Swal from "sweetalert2";

function Settings() {

    const [form, setForm] = useState({

        store_name: "",
        owner_name: "",
        phone: "",
        email: "",
        address: "",
        gst_number: "",
        currency: "₹",
        logo: ""

    });

    useEffect(() => {

        loadSettings();

    }, []);

    const loadSettings = async () => {

        try {

            const data = await getSettings();

            setForm(data);

        }

        catch (err) {

            console.log(err);

        }

    };

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await updateSettings(form);

            Swal.fire({

                icon: "success",

                title: "Success",

                text: "Settings Saved Successfully"

            });

        }

        catch (err) {

            Swal.fire({

                icon: "error",

                title: "Error",

                text: "Unable to Save Settings"

            });

        }

    };

    return (

        <div className="d-flex">

            <Sidebar />

            <div
                className="flex-grow-1"
                style={{
                    background: "#f4f6f9",
                    minHeight: "100vh"
                }}
            >

                <Navbar />

                <div className="container p-4">

                    <div className="card shadow">

                        <div className="card-header">

                            <h3>

                                Store Settings

                            </h3>

                        </div>

                        <div className="card-body">

                            <form onSubmit={handleSubmit}>

                                <div className="row">

                                    <div className="col-md-6 mb-3">

                                        <label>Store Name</label>

                                        <input
                                            className="form-control"
                                            name="store_name"
                                            value={form.store_name}
                                            onChange={handleChange}
                                        />

                                    </div>

                                    <div className="col-md-6 mb-3">

                                        <label>Owner Name</label>

                                        <input
                                            className="form-control"
                                            name="owner_name"
                                            value={form.owner_name}
                                            onChange={handleChange}
                                        />

                                    </div>

                                    <div className="col-md-6 mb-3">

                                        <label>Phone</label>

                                        <input
                                            className="form-control"
                                            name="phone"
                                            value={form.phone}
                                            onChange={handleChange}
                                        />

                                    </div>

                                    <div className="col-md-6 mb-3">

                                        <label>Email</label>

                                        <input
                                            className="form-control"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                        />

                                    </div>

                                    <div className="col-md-6 mb-3">

                                        <label>GST Number</label>

                                        <input
                                            className="form-control"
                                            name="gst_number"
                                            value={form.gst_number}
                                            onChange={handleChange}
                                        />

                                    </div>

                                    <div className="col-md-6 mb-3">

                                        <label>Currency</label>

                                        <input
                                            className="form-control"
                                            name="currency"
                                            value={form.currency}
                                            onChange={handleChange}
                                        />

                                    </div>

                                    <div className="col-md-12 mb-3">

                                        <label>Address</label>

                                        <textarea
                                            className="form-control"
                                            rows="3"
                                            name="address"
                                            value={form.address}
                                            onChange={handleChange}
                                        />

                                    </div>

                                    <div className="col-md-12 mb-4">

                                        <label>Logo URL</label>

                                        <input
                                            className="form-control"
                                            name="logo"
                                            value={form.logo}
                                            onChange={handleChange}
                                        />

                                    </div>

                                </div>

                                <button
                                    className="btn btn-primary"
                                >

                                    Save Settings

                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Settings;