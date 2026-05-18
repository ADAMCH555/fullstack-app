import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const onLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    FullStack App
                </Link>
                <div className="nav-menu">
                    {user ? (
                        <>
                            <Link to="/dashboard" className="nav-item">Dashboard</Link>
                            <span className="nav-item welcome">Hi, {user.name.split(" ")[0]}</span>
                            <button className="btn-logout" onClick={onLogout}>Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-item">Login</Link>
                            <Link to="/register" className="btn-primary btn-sm">Sign Up</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
