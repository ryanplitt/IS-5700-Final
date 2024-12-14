import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const useProductSearch = (initialQuery = "") => {
	const { isAuthenticated } = useAuth();
	const [groupedProducts, setGroupedProducts] = useState({});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const flattenGroupedProducts = (grouped) => Object.values(grouped).flat();

	const searchProducts = async (query) => {
		setLoading(true);
		setError(null);

		const url = isAuthenticated
			? `${BACKEND_URL}/api/products/all`
			: `${BACKEND_URL}/api/products/published`;

		try {
			const response = await axios.get(url, {
				params: {
					search: query,
					groupBy: "product_type",
				},
			});
			const grouped = response.data.products;

			const allProducts = flattenGroupedProducts(grouped);
			const filteredProducts = isAuthenticated
				? allProducts
				: allProducts.filter((product) => product.inventory > 0);

			const regroupedProducts = filteredProducts.reduce((acc, product) => {
				if (!acc[product.product_type]) acc[product.product_type] = [];
				acc[product.product_type].push(product);
				return acc;
			}, {});

			setGroupedProducts(regroupedProducts);
		} catch (err) {
			console.error("Error fetching products:", err);
			setError("Failed to fetch products. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		searchProducts(initialQuery);
	}, [initialQuery, isAuthenticated]);

	return { groupedProducts, loading, error, searchProducts };
};

export default useProductSearch;
