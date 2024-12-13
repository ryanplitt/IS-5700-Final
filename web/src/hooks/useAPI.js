import { useCallback } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

const api = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

export const useAPI = () => {
	const fetchPublishedProducts = useCallback(async (query = "") => {
		try {
			// Pass the query as a parameter to the API
			const response = await api.get("/products/published", {
				params: { search: query },
			});
			return response.data.products;
		} catch (error) {
			console.error("Error fetching published products:", error);
			throw error;
		}
	}, []);

	const fetchAllProducts = useCallback(async () => {
		try {
			const response = await api.get("/products/all");
			return response.data.products;
		} catch (error) {
			console.error("Error fetching all products:", error);
			throw error;
		}
	}, []);

	const updateProduct = useCallback(async (productId, productData) => {
		try {
			const response = await api.put(`/products/${productId}`, { product: productData });
			return response.data.message;
		} catch (error) {
			console.error("Error updating product:", error);
			throw error;
		}
	}, []);

	return {
		fetchPublishedProducts,
		fetchAllProducts,
		updateProduct,
	};
};
