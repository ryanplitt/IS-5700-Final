import React, { useState, useEffect } from "react";
import axios from "axios";
import DebouncedSearch from "./components/DebouncedSearch";
import ProductsPage from "./ProductsPage";
import { Link } from "react-router-dom";

const Layout = () => {
	const [groupedProducts, setGroupedProducts] = useState({}); // Grouped products by type
	const [loading, setLoading] = useState(false); // Loading state
	const [error, setError] = useState(null); // Error state

	// Handle search and grouping functionality
	const handleSearch = async (query) => {
		setLoading(true);
		setError(null);

		try {
			// API request with optional search query and groupBy
			const response = await axios.get("http://localhost:3000/products/published", {
				params: {
					search: query,
					groupBy: "product_type",
				},
			});

			setGroupedProducts(response.data.products); // Set grouped products
		} catch (err) {
			console.error("Error fetching products:", err);
			setError("Failed to fetch products. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	// Fetch all products grouped by type on initial load
	useEffect(() => {
		handleSearch("");
	}, []);

	return (
		<div>
			{/* Navbar */}
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

			{/* Search Section */}
			<div className="section">
				<div className="container">
					{/* Search Bar */}
					<DebouncedSearch onSearch={handleSearch} placeholder="Search products..." />
				</div>
			</div>

			{/* Products Page */}
			<div className="container">
				<ProductsPage groupedProducts={groupedProducts} loading={loading} error={error} />
			</div>
		</div>
	);
};

export default Layout;
