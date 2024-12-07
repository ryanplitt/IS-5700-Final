import React, { useState, useEffect } from "react";
import Cart from "./Cart";
import { useAPI } from "./hooks/useAPI";

const Layout = ({ children }) => {
	const [cart, setCart] = useState([]);
	const [isCartOpen, setIsCartOpen] = useState(false);
	const { fetchPublishedProducts } = useAPI(); // Example API hook usage

	useEffect(() => {
		// Example of using the API hook to fetch initial data (optional)
		const fetchProducts = async () => {
			try {
				const products = await fetchPublishedProducts();
				console.log("Fetched products:", products); // Example use of fetched data
			} catch (error) {
				console.error("Failed to fetch products:", error);
			}
		};

		fetchProducts();
	}, [fetchPublishedProducts]);

	const addToCart = (product) => {
		setCart((prevCart) => [...prevCart, product]);
	};

	return (
		<>
			{/* Navbar */}
			<nav className="navbar" role="navigation" aria-label="main navigation">
				<div className="navbar-brand">
					<a className="navbar-item" href="#">
						My Store
					</a>
				</div>
				<div className="navbar-menu">
					<div className="navbar-start">
						<a className="navbar-item" href="#">
							Products
						</a>
						<a className="navbar-item" href="#">
							Login
						</a>
					</div>
					<div className="navbar-end">
						<button className="button is-primary" onClick={() => setIsCartOpen(!isCartOpen)}>
							Cart ({cart.length})
						</button>
					</div>
				</div>
			</nav>

			{/* Main Content */}
			<main>{React.cloneElement(children, { addToCart })}</main>

			{/* Footer */}
			<footer className="footer">
				<div className="content has-text-centered">
					<p>
						<strong>My Store</strong> by Ryan. Powered by Bulma.
					</p>
				</div>
			</footer>

			{/* Cart Side View */}
			{isCartOpen && <Cart cart={cart} onClose={() => setIsCartOpen(false)} />}
		</>
	);
};

export default Layout;
