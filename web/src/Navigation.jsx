import React from "react";
import { Link } from "react-router-dom";
import "./styles/main.scss";
import { useAuth } from "./context/AuthContext";

const Navigation = ({ children }) => {
	const auth = useAuth();
	const isAuthenticated = auth ? auth.isAuthenticated : false;

	const handleLogout = () => {
		auth.logout();
		window.location.href = "/login";
	};

	return (
		<>
			<nav className="navbar is-primary" role="navigation" aria-label="main navigation">
				<div className="navbar-menu">
					<div className="navbar-start">
						<Link to="/" className="navbar-item">
							Home
						</Link>
						{isAuthenticated && (
							<Link to="/admin" className="navbar-item">
								Admin Panel
							</Link>
						)}
					</div>
					<div className="navbar-end">
						{isAuthenticated ? (
							<>
								<span className="navbar-item">{auth.admin.username}</span>
								<a onClick={handleLogout} className="navbar-item" style={{ cursor: "pointer" }}>
									Logout
								</a>
							</>
						) : (
							<Link to="/login" className="navbar-item">
								Login
							</Link>
						)}
					</div>
				</div>
			</nav>
			{children}
		</>
	);
};

export default Navigation;
