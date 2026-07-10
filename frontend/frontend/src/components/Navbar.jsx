import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

function Navbar() {

    const { logout } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleLogout = () => {

        logout();

        navigate("/login");

    };

    return (

        <nav
            className="navbar navbar-expand-lg navbar-dark bg-dark shadow"
        >

            <div className="container-fluid">

                <h4 className="text-white">

                    Hardware Store Management

                </h4>

                <button
                    className="btn btn-danger"
                    onClick={handleLogout}
                >

                    <FaSignOutAlt />

                    {" "}

                    Logout

                </button>

            </div>

        </nav>

    );

}

export default Navbar;