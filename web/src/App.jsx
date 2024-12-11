import "./App.css";
import Layout from "./Layout";
import React from "react";
import ProductsPage from "./ProductsPage";
import { CartProvider } from "./providers/CartProvider";

function App() {
	return (
		<CartProvider>
			<Layout>
				<ProductsPage />
			</Layout>
		</CartProvider>
	);
}

export default App;
