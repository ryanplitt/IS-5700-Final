import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import ProductsPage from "./ProductsPage";
import Login from "./Login";
import { CartProvider } from "./context/CartProvider";
import DebouncedSearch from "./components/DebouncedSearch";
import useProductSearch from "./hooks/useProductSearch";
import AdminPanel from "./components/AdminPanel";
import { useAuth } from "./context/AuthContext";
import EditProductPage from "./components/EditProductPage";
import Toast from "./components/Toast";

const ProtectedRoute = ({ children }) => {
	const { isAuthenticated } = useAuth();
	return isAuthenticated ? children : <Navigate to="/login" />;
};

const Router = () => {
	const { groupedProducts, loading, error, searchProducts } = useProductSearch("");

	return (
		<Routes>
			<Route
				path="/"
				element={
					<CartProvider>
						<div className="section">
							<div className="container">
								<DebouncedSearch onSearch={searchProducts} placeholder="Search products..." />
							</div>
						</div>

						<div className="container">
							<ProductsPage groupedProducts={groupedProducts} loading={loading} error={error} />
						</div>
					</CartProvider>
				}
			/>
			<Route path="/login" element={<Login />} />
			<Route
				path="/admin"
				element={
					<ProtectedRoute>
						<AdminPanel />
					</ProtectedRoute>
				}
			/>
			<Route path="edit-product/:productId" element={<EditProductPage />} />
		</Routes>
	);
};

export default Router;
