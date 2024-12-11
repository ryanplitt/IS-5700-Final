import React, { useState, useEffect, useRef } from "react";
import { useCart } from "./hooks/useCart";

const Layout = ({ children }) => {
	const { cart } = useCart(); // Using useCart hook to access cart data
	const [isCartOpen, setIsCartOpen] = useState(false);
	const dropdownRef = useRef();

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsCartOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const toggleCart = () => setIsCartOpen(!isCartOpen);

	return (
		<div>
			{/* Navbar */}
			<nav className="navbar is-primary" role="navigation" aria-label="main navigation">
				<div className="navbar-menu">
					<div className="navbar-start">
						<a className="navbar-item" href="#">
							Products
						</a>
						<a className="navbar-item" href="#">
							Login
						</a>
					</div>
					<div className="navbar-end" ref={dropdownRef}>
						{/* Cart Dropdown directly in Navbar */}
						<div
							className={`dropdown is-right ${isCartOpen ? "is-active" : ""}`}
							style={{ position: "relative" }}
						>
							{/* Dropdown Trigger */}
							<button
								className="button"
								aria-haspopup="true"
								aria-controls="dropdown-menu"
								onClick={toggleCart}
							>
								<span>Cart ({cart.length})</span>
								<span className="icon is-small">
									<i className="fas fa-angle-down" aria-hidden="true"></i>
								</span>
							</button>

							{/* Dropdown Content */}
							<div
								className="dropdown-menu"
								id="dropdown-menu"
								role="menu"
								style={{
									position: "absolute",
									right: 0,
									top: "100%", // Adjust to align under the button
								}}
							>
								<div className="dropdown-content">
									{/* Cart Content */}
									{cart.length === 0 ? (
										<div className="dropdown-item">Your cart is empty.</div>
									) : (
										cart.map((item) => (
											<div key={item.id} className="dropdown-item">
												<p>
													<strong>{item.name}</strong>
												</p>
												<p>${item.price.toFixed(2)}</p>
												<p>Qty: {item.quantity}</p>
											</div>
										))
									)}
									<hr className="dropdown-divider" />
									<div className="dropdown-item">
										<button className="button is-primary is-fullwidth">Checkout</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</nav>

			{/* Main Content */}
			<div className="columns">
				{/* Products Section */}
				<div className="column products-view">{children}</div>
			</div>
		</div>
	);
};

export default Layout;
