import { useEffect, useState } from "react";

import api from "../api/axios";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import SalesReportTable from "../components/Reports/SalesReportTable";
import PurchaseReportTable from "../components/Reports/PurchaseReportTable";
import StockReportTable from "../components/Reports/StockReportTable";
import LowStockTable from "../components/Reports/LowStockTable";

import {
    exportProducts,
    exportSales,
    exportPurchases,
    exportStock
} from "../services/exportService";

import {
    FaFileExcel,
    FaChartBar
} from "react-icons/fa";

function Reports() {

    const [summary, setSummary] = useState({

        sales_amount: 0,
        purchase_amount: 0,
        products: 0,
        low_stock: 0

    });

    useEffect(() => {

        loadSummary();

    }, []);

    const loadSummary = async () => {

        try {

            const response = await api.get("/reports/summary");

            setSummary(response.data);

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
                    background: "#f5f7fa",
                    minHeight: "100vh"
                }}
            >

                <Navbar />

                <div className="container-fluid p-4">

                    <div className="d-flex justify-content-between align-items-center mb-4">

                        <h2 className="fw-bold">

                            <FaChartBar className="me-2" />

                            Reports Dashboard

                        </h2>

                    </div>

                    <div className="card shadow mb-4">

                        <div className="card-body">

                            <h5 className="mb-3">

                                Export Reports

                            </h5>

                            <button
                                className="btn btn-success me-2 mb-2"
                                onClick={exportProducts}
                            >

                                <FaFileExcel className="me-2" />

                                Products

                            </button>

                            <button
                                className="btn btn-primary me-2 mb-2"
                                onClick={exportSales}
                            >

                                <FaFileExcel className="me-2" />

                                Sales

                            </button>

                            <button
                                className="btn btn-warning me-2 mb-2"
                                onClick={exportPurchases}
                            >

                                <FaFileExcel className="me-2" />

                                Purchases

                            </button>

                            <button
                                className="btn btn-secondary mb-2"
                                onClick={exportStock}
                            >

                                <FaFileExcel className="me-2" />

                                Stock

                            </button>

                        </div>

                    </div>

                    <div className="row">

                        <div className="col-lg-3 col-md-6 mb-4">

                            <div className="card shadow border-start border-success border-5">

                                <div className="card-body">

                                    <h6 className="text-muted">

                                        Total Sales

                                    </h6>

                                    <h3 className="text-success">

                                        ₹ {Number(summary.sales_amount).toLocaleString()}

                                    </h3>

                                </div>

                            </div>

                        </div>

                        <div className="col-lg-3 col-md-6 mb-4">

                            <div className="card shadow border-start border-primary border-5">

                                <div className="card-body">

                                    <h6 className="text-muted">

                                        Total Purchases

                                    </h6>

                                    <h3 className="text-primary">

                                        ₹ {Number(summary.purchase_amount).toLocaleString()}

                                    </h3>

                                </div>

                            </div>

                        </div>

                        <div className="col-lg-3 col-md-6 mb-4">

                            <div className="card shadow border-start border-info border-5">

                                <div className="card-body">

                                    <h6 className="text-muted">

                                        Products

                                    </h6>

                                    <h3>

                                        {summary.products}

                                    </h3>

                                </div>

                            </div>

                        </div>

                        <div className="col-lg-3 col-md-6 mb-4">

                            <div className="card shadow border-start border-danger border-5">

                                <div className="card-body">

                                    <h6 className="text-muted">

                                        Low Stock

                                    </h6>

                                    <h3 className="text-danger">

                                        {summary.low_stock}

                                    </h3>

                                </div>

                            </div>

                        </div>

                    </div>

                    <SalesReportTable />

                    <PurchaseReportTable />

                    <StockReportTable />

                    <LowStockTable />

                </div>

            </div>

        </div>

    );

}

export default Reports;