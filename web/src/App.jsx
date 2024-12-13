import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import ProductsPage from "./ProductsPage";
import Login from "./Login";
import { CartProvider } from "./providers/CartProvider";
import "./utils/stringExtensions";
import "./styles/main.scss";

function App() {
	return (
		<Router>
			<CartProvider>
				<Layout>
					<Routes>
						<Route path="/login" element={<Login />} />
						<Route path="/" element={<ProductsPage />} />
					</Routes>
				</Layout>
			</CartProvider>
		</Router>
	);
}

export default App;
