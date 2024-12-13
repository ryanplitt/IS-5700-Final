import { useState, useEffect } from "react";
import axios from "axios";

const useProductSearch = (initialQuery = "") => {
	const [groupedProducts, setGroupedProducts] = useState({});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	// Fetch products based on a search query
	const searchProducts = async (query) => {
		setLoading(true);
		setError(null);

		try {
			const response = await axios.get("http://localhost:3000/products/published", {
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
	}, [initialQuery]);

	return { groupedProducts, loading, error, searchProducts };
};

export default useProductSearch;
