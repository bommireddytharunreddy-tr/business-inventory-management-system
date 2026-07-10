import { useEffect, useState } from "react";

import api from "../api/axios";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line
} from "recharts";

import {
    FaBoxOpen,
    FaTags,
    FaTruck,
    FaUsers,
    FaShoppingCart,
    FaCashRegister,
    FaExclamationTriangle,
    FaRupeeSign,
    FaWarehouse
} from "react-icons/fa";

function Dashboard() {

    const [stats, setStats] = useState({

        products: 0,
        categories: 0,
        suppliers: 0,
        customers: 0,
        purchases: 0,
        sales: 0,
        purchase_amount: 0,
        sales_amount: 0,
        low_stock_products: 0,
        inventory_value: 0

    });

    const [salesChart, setSalesChart] = useState([]);

    const [purchaseChart, setPurchaseChart] = useState([]);

    const [lowStock, setLowStock] = useState([]);

    const [recentSales, setRecentSales] = useState([]);

    const [recentPurchases, setRecentPurchases] = useState([]);

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            const [

                statsRes,
                salesRes,
                purchaseRes,
                lowRes,
                recentSalesRes,
                recentPurchaseRes

            ] = await Promise.all([

                api.get("/dashboard/stats"),

                api.get("/dashboard/monthly-sales"),

                api.get("/dashboard/monthly-purchases"),

                api.get("/dashboard/low-stock"),

                api.get("/dashboard/recent-sales"),

                api.get("/dashboard/recent-purchases")

            ]);

            setStats(statsRes.data);

            setSalesChart(salesRes.data);

            setPurchaseChart(purchaseRes.data);

            setLowStock(lowRes.data);

            setRecentSales(recentSalesRes.data);

            setRecentPurchases(recentPurchaseRes.data);

        }

        catch (error) {

            console.log(error);

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

                <div className="container-fluid p-4">

                    <h2 className="fw-bold mb-4">

                        Dashboard

                    </h2>

                    <div className="row">

                        <div className="col-lg-3 col-md-6 mb-4">

                            <div className="card shadow border-0">

                                <div className="card-body">

                                    <FaBoxOpen
                                        size={35}
                                        className="text-primary mb-2"
                                    />

                                    <h6>Total Products</h6>

                                    <h3>{stats.products}</h3>

                                </div>

                            </div>

                        </div>

                        <div className="col-lg-3 col-md-6 mb-4">

                            <div className="card shadow border-0">

                                <div className="card-body">

                                    <FaTags
                                        size={35}
                                        className="text-success mb-2"
                                    />

                                    <h6>Categories</h6>

                                    <h3>{stats.categories}</h3>

                                </div>

                            </div>

                        </div>

                        <div className="col-lg-3 col-md-6 mb-4">

                            <div className="card shadow border-0">

                                <div className="card-body">

                                    <FaTruck
                                        size={35}
                                        className="text-warning mb-2"
                                    />

                                    <h6>Suppliers</h6>

                                    <h3>{stats.suppliers}</h3>

                                </div>

                            </div>

                        </div>

                        <div className="col-lg-3 col-md-6 mb-4">

                            <div className="card shadow border-0">

                                <div className="card-body">

                                    <FaUsers
                                        size={35}
                                        className="text-info mb-2"
                                    />

                                    <h6>Customers</h6>

                                    <h3>{stats.customers}</h3>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="row">

                        <div className="col-lg-3 col-md-6 mb-4">

                            <div className="card shadow border-0">

                                <div className="card-body">

                                    <FaShoppingCart
                                        size={35}
                                        className="text-secondary mb-2"
                                    />

                                    <h6>Purchases</h6>

                                    <h3>{stats.purchases}</h3>

                                </div>

                            </div>

                        </div>

                        <div className="col-lg-3 col-md-6 mb-4">

                            <div className="card shadow border-0">

                                <div className="card-body">

                                    <FaCashRegister
                                        size={35}
                                        className="text-danger mb-2"
                                    />

                                    <h6>Sales</h6>

                                    <h3>{stats.sales}</h3>

                                </div>

                            </div>

                        </div>

                        <div className="col-lg-3 col-md-6 mb-4">

                            <div className="card shadow border-0">

                                <div className="card-body">

                                    <FaExclamationTriangle
                                        size={35}
                                        className="text-warning mb-2"
                                    />

                                    <h6>Low Stock</h6>

                                    <h3>{stats.low_stock_products}</h3>

                                </div>

                            </div>

                        </div>

                        <div className="col-lg-3 col-md-6 mb-4">

                            <div className="card shadow border-0">

                                <div className="card-body">

                                    <FaWarehouse
                                        size={35}
                                        className="text-success mb-2"
                                    />

                                    <h6>Inventory Value</h6>

                                    <h5>

                                        ₹ {Number(stats.inventory_value).toLocaleString()}

                                    </h5>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="row">

                        <div className="col-lg-6 mb-4">

                            <div className="card shadow">

                                <div className="card-header">

                                    Monthly Sales

                                </div>

                                <div className="card-body">

                                    <ResponsiveContainer
                                        width="100%"
                                        height={300}
                                    >

                                        <BarChart data={salesChart}>

                                            <CartesianGrid strokeDasharray="3 3" />

                                            <XAxis dataKey="month" />

                                            <YAxis />

                                            <Tooltip />

                                            <Bar
                                                dataKey="sales"
                                            />

                                        </BarChart>

                                    </ResponsiveContainer>

                                </div>

                            </div>

                        </div>

                        <div className="col-lg-6 mb-4">

                            <div className="card shadow">

                                <div className="card-header">

                                    Monthly Purchases

                                </div>

                                <div className="card-body">

                                    <ResponsiveContainer
                                        width="100%"
                                        height={300}
                                    >

                                        <LineChart
                                            data={purchaseChart}
                                        >

                                            <CartesianGrid strokeDasharray="3 3" />

                                            <XAxis dataKey="month" />

                                            <YAxis />

                                            <Tooltip />

                                            <Line
                                                type="monotone"
                                                dataKey="purchases"
                                            />

                                        </LineChart>

                                    </ResponsiveContainer>

                                </div>

                            </div>

                        </div>

                    </div>
                                        <div className="row">

                        <div className="col-lg-6 mb-4">

                            <div className="card shadow">

                                <div className="card-header bg-primary text-white">

                                    <h5 className="mb-0">

                                        Recent Sales

                                    </h5>

                                </div>

                                <div className="card-body table-responsive">

                                    <table className="table table-striped table-hover">

                                        <thead>

                                            <tr>

                                                <th>ID</th>
                                                <th>Customer</th>
                                                <th>Total</th>
                                                <th>Date</th>

                                            </tr>

                                        </thead>

                                        <tbody>

                                            {

                                                recentSales.length > 0 ?

                                                    recentSales.map((sale) => (

                                                        <tr key={sale.id}>

                                                            <td>{sale.id}</td>

                                                            <td>{sale.customer_id}</td>

                                                            <td>

                                                                ₹ {sale.total_amount}

                                                            </td>

                                                            <td>

                                                                {

                                                                    new Date(
                                                                        sale.sale_date
                                                                    ).toLocaleDateString()

                                                                }

                                                            </td>

                                                        </tr>

                                                    ))

                                                    :

                                                    <tr>

                                                        <td
                                                            colSpan="4"
                                                            className="text-center"
                                                        >

                                                            No Sales Found

                                                        </td>

                                                    </tr>

                                            }

                                        </tbody>

                                    </table>

                                </div>

                            </div>

                        </div>

                        <div className="col-lg-6 mb-4">

                            <div className="card shadow">

                                <div className="card-header bg-success text-white">

                                    <h5 className="mb-0">

                                        Recent Purchases

                                    </h5>

                                </div>

                                <div className="card-body table-responsive">

                                    <table className="table table-striped table-hover">

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

                                                recentPurchases.length > 0 ?

                                                    recentPurchases.map((purchase) => (

                                                        <tr key={purchase.id}>

                                                            <td>{purchase.id}</td>

                                                            <td>{purchase.supplier_id}</td>

                                                            <td>

                                                                ₹ {purchase.total_amount}

                                                            </td>

                                                            <td>

                                                                {

                                                                    new Date(
                                                                        purchase.purchase_date
                                                                    ).toLocaleDateString()

                                                                }

                                                            </td>

                                                        </tr>

                                                    ))

                                                    :

                                                    <tr>

                                                        <td
                                                            colSpan="4"
                                                            className="text-center"
                                                        >

                                                            No Purchases Found

                                                        </td>

                                                    </tr>

                                            }

                                        </tbody>

                                    </table>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="card shadow">

                        <div className="card-header bg-danger text-white">

                            <h5 className="mb-0">

                                Low Stock Products

                            </h5>

                        </div>

                        <div className="card-body table-responsive">

                            <table className="table table-bordered table-hover">

                                <thead>

                                    <tr>

                                        <th>ID</th>
                                        <th>Product</th>
                                        <th>Brand</th>
                                        <th>Stock</th>
                                        <th>Minimum Stock</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {

                                        lowStock.length > 0 ?

                                            lowStock.map((product) => (

                                                <tr key={product.id}>

                                                    <td>{product.id}</td>

                                                    <td>{product.name}</td>

                                                    <td>{product.brand}</td>

                                                    <td>{product.stock}</td>

                                                    <td>{product.minimum_stock}</td>

                                                </tr>

                                            ))

                                            :

                                            <tr>

                                                <td
                                                    colSpan="5"
                                                    className="text-center"
                                                >

                                                    No Low Stock Products

                                                </td>

                                            </tr>

                                    }

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Dashboard;