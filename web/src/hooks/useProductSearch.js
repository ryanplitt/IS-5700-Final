import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const useProductSearch = (initialQuery = "") => {
	const { isAuthenticated } = useAuth();
	const [groupedProducts, setGroupedProducts] = useState({});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	// Fetch products based on a search query
	const searchProducts = async (query) => {
		setLoading(true);
		setError(null);

		const url = isAuthenticated
			? "http://localhost:3000/products/all"
			: "http://localhost:3000/products/published";

		try {
			const response = await axios.get(url, {
				params: {
					search: query,
					groupBy: "product_type",
				},
			});
			setGroupedProducts(response.data.products);
		} catch (err) {
			console.error("Error fetching products:", err);
			setError("Failed to fetch products. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	// Fetch products on initial load
	useEffect(() => {
		searchProducts(initialQuery);
	}, [initialQuery, isAuthenticated]);

	return { groupedProducts, loading, error, searchProducts };
};

export default useProductSearch;
