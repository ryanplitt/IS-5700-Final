import React from "react";
import { Link } from "react-router-dom";
import "./styles/main.scss";

const Navigation = ({ children }) => {
	return (
		<>
			<nav className="navbar is-primary" role="navigation" aria-label="main navigation">
				<div className="navbar-menu">
					<div className="navbar-start">
						<Link to="/" className="navbar-item">
							Home
						</Link>
					</div>
					<div className="navbar-end">
						<Link to="/login" className="navbar-item">
							Login
						</Link>
					</div>
				</div>
			</nav>
			{children}
		</>
	);
};

export default Navigation;
