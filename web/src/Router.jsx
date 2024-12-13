import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductsPage from "./ProductsPage";
import Login from "./Login";
import { CartProvider } from "./providers/CartProvider";
import DebouncedSearch from "./components/DebouncedSearch";
import useProductSearch from "./hooks/useProductSearch";

const Router = () => {
	// Use the custom search hook
	const { groupedProducts, loading, error, searchProducts } = useProductSearch("");

	return (
		<Routes>
			<Route
				path="/"
				element={
					<CartProvider>
						{/* Search Bar */}
						<div className="section">
							<div className="container">
								<DebouncedSearch onSearch={searchProducts} placeholder="Search products..." />
							</div>
						</div>

						{/* Products Page */}
						<div className="container">
							<ProductsPage groupedProducts={groupedProducts} loading={loading} error={error} />
						</div>
					</CartProvider>
				}
			/>
			<Route path="/login" element={<Login />} />
		</Routes>
	);
};

export default Router;
