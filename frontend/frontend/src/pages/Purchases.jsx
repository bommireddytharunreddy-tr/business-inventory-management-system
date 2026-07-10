import { useEffect, useState } from "react";

import api from "../api/axios";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import PurchaseForm from "../components/Purchase/PurchaseForm";
import PurchaseHistory from "../components/Purchase/PurchaseHistory";

import Swal from "sweetalert2";

function Purchases() {

    const [suppliers, setSuppliers] = useState([]);

    const [products, setProducts] = useState([]);

    const [purchases, setPurchases] = useState([]);

    const [supplierId, setSupplierId] = useState("");

    const [items, setItems] = useState([
        {
            product_id: "",
            quantity: 1,
            purchase_price: 0
        }
    ]);

    useEffect(() => {

        loadSuppliers();

        loadProducts();

        loadPurchases();

    }, []);

    const loadSuppliers = async () => {

        try {

            const response = await api.get("/suppliers/");

            setSuppliers(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    const loadProducts = async () => {

        try {

            const response = await api.get("/products/");

            if (response.data.products) {

                setProducts(response.data.products);

            }

            else {

                setProducts(response.data);

            }

        }

        catch (error) {

            console.log(error);

        }

    };

    const loadPurchases = async () => {

        try {

            const response = await api.get("/purchases/");

            setPurchases(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };
        const handleSave = async () => {

        if (supplierId === "") {

            Swal.fire(
                "Warning",
                "Please select a supplier.",
                "warning"
            );

            return;

        }

        if (items.length === 0) {

            Swal.fire(
                "Warning",
                "Please add at least one product.",
                "warning"
            );

            return;

        }

        for (let item of items) {

            if (
                item.product_id === "" ||
                item.quantity <= 0 ||
                item.purchase_price <= 0
            ) {

                Swal.fire(
                    "Warning",
                    "Please complete all product details.",
                    "warning"
                );

                return;

            }

        }

        try {

            await api.post(
                "/purchases/",
                {
                    supplier_id: Number(supplierId),
                    items: items.map(item => ({
                        product_id: Number(item.product_id),
                        quantity: Number(item.quantity),
                        purchase_price: Number(item.purchase_price)
                    }))
                }
            );

            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Purchase Added Successfully",
                timer: 1500,
                showConfirmButton: false
            });

            setSupplierId("");

            setItems([
                {
                    product_id: "",
                    quantity: 1,
                    purchase_price: 0
                }
            ]);

            loadPurchases();

        }

        catch (error) {

            console.log(error);

            Swal.fire(
                "Error",
                "Unable to save purchase.",
                "error"
            );

        }

    };

    const handleDelete = async (id) => {

        try {

            await api.delete(`/purchases/${id}`);

            Swal.fire({
                icon: "success",
                title: "Deleted",
                text: "Purchase Deleted Successfully",
                timer: 1500,
                showConfirmButton: false
            });

            loadPurchases();

        }

        catch (error) {

            console.log(error);

            Swal.fire(
                "Error",
                "Unable to delete purchase.",
                "error"
            );

        }

    };
        return (

        <div className="d-flex">

            <Sidebar />

            <div
                className="flex-grow-1"
                style={{
                    background: "#f8f9fa",
                    minHeight: "100vh"
                }}
            >

                <Navbar />

                <div className="container-fluid p-4">

                    <PurchaseForm
                        suppliers={suppliers}
                        products={products}
                        supplierId={supplierId}
                        setSupplierId={setSupplierId}
                        items={items}
                        setItems={setItems}
                        handleSave={handleSave}
                    />

                    <PurchaseHistory
                        purchases={purchases}
                        handleDelete={handleDelete}
                    />

                </div>

            </div>

        </div>

    );

}

export default Purchases;