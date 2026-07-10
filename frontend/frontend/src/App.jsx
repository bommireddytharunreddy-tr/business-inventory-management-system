import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Suppliers from "./pages/Suppliers";
import Customers from "./pages/Customers";
import Purchases from "./pages/Purchases";
import Sales from "./pages/Sales";
import Reports from "./pages/Reports";

import PrivateRoute from "./components/PrivateRoute";

function App() {

    return (

        <Routes>

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/"
                element={
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                }
            />

            <Route
                path="/products"
                element={
                    <PrivateRoute>
                        <Products />
                    </PrivateRoute>
                }
            />

            <Route
                path="/categories"
                element={
                    <PrivateRoute>
                        <Categories />
                    </PrivateRoute>
                }
            />

            <Route
                path="/suppliers"
                element={
                    <PrivateRoute>
                        <Suppliers />
                    </PrivateRoute>
                }
            />

            <Route
                path="/customers"
                element={
                    <PrivateRoute>
                        <Customers />
                    </PrivateRoute>
                }
            />

            <Route
                path="/purchases"
                element={
                    <PrivateRoute>
                        <Purchases />
                    </PrivateRoute>
                }
            />

            <Route
                path="/sales"
                element={
                    <PrivateRoute>
                        <Sales />
                    </PrivateRoute>
                }
            />

            <Route
                path="/reports"
                element={
                    <PrivateRoute>
                        <Reports />
                    </PrivateRoute>
                }
            />

        </Routes>

    );

}

export default App;