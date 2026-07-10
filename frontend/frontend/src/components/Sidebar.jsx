import {
    FaTachometerAlt,
    FaBoxOpen,
    FaTags,
    FaTruck,
    FaUsers,
    FaShoppingCart,
    FaCashRegister,
    FaFileAlt,
    FaCog
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

function Sidebar() {

    const menuItems = [

        {
            name: "Dashboard",
            path: "/",
            icon: <FaTachometerAlt />
        },

        {
            name: "Products",
            path: "/products",
            icon: <FaBoxOpen />
        },

        {
            name: "Categories",
            path: "/categories",
            icon: <FaTags />
        },

        {
            name: "Suppliers",
            path: "/suppliers",
            icon: <FaTruck />
        },

        {
            name: "Customers",
            path: "/customers",
            icon: <FaUsers />
        },

        {
            name: "Purchases",
            path: "/purchases",
            icon: <FaShoppingCart />
        },

        {
            name: "Sales",
            path: "/sales",
            icon: <FaCashRegister />
        },

        {
            name: "Reports",
            path: "/reports",
            icon: <FaFileAlt />
        },

        {
            name: "Settings",
            path: "/settings",
            icon: <FaCog />
        }

    ];

    return (

        <div
            className="shadow"
            style={{
                width: "260px",
                minHeight: "100vh",
                background: "#1f2937",
                color: "#fff",
                position: "sticky",
                top: 0
            }}
        >

            <div
                className="text-center py-4 border-bottom"
                style={{
                    borderColor: "#374151"
                }}
            >

                <h3
                    className="fw-bold"
                    style={{
                        color: "#ffffff"
                    }}
                >
                    🛠 Store Manager
                </h3>

                <small
                    style={{
                        color: "#9ca3af"
                    }}
                >
                    Inventory Management
                </small>

            </div>

            <div className="mt-3">

                {

                    menuItems.map((item) => (

                        <NavLink
                            key={item.name}
                            to={item.path}
                            end={item.path === "/"}
                            className={({ isActive }) =>

                                `d-flex align-items-center text-decoration-none px-4 py-3 mx-2 mb-2 rounded ${
                                    isActive
                                        ? "bg-primary text-white"
                                        : "text-light"
                                }`

                            }
                        >

                            <span
                                style={{
                                    fontSize: "20px",
                                    width: "35px"
                                }}
                            >
                                {item.icon}
                            </span>

                            <span
                                style={{
                                    fontWeight: 500
                                }}
                            >
                                {item.name}
                            </span>

                        </NavLink>

                    ))

                }

            </div>

            <div
                className="text-center mt-5 pt-4"
                style={{
                    borderTop: "1px solid #374151",
                    color: "#9ca3af",
                    fontSize: "13px"
                }}
            >

                <div>Version 1.0</div>

                <div>© 2026 Store Manager</div>

            </div>

        </div>

    );

}

export default Sidebar;