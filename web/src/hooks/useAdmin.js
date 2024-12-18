import { useState } from "react";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
	baseURL: `${BACKEND_URL}`,
});

export const useAdmin = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const getAllProducts = async (groupBy, search) => {
		setLoading(true);
		setError(null);
		try {
			const response = await api.get("/products/all", {
				params: { groupBy, search },
			});
			return response.data;
		} catch (err) {
			setError(err.message);
			throw err;
		} finally {
			setLoading(false);
		}
	};

	const updateProduct = async (productId, product) => {
		setLoading(true);
		setError(null);
		try {
			const response = await api.put(`/products/${productId}`, { product });
			return response.data;
		} catch (err) {
			setError(err.message);
			throw err;
		} finally {
			setLoading(false);
		}
	};

	const publishProduct = async (product) => {
		setLoading(true);
		setError(null);
		try {
			const response = await api.put(`/products/${product.id}`, {
				product: { ...product, published: true },
			});
			return response.data;
		} catch (err) {
			setError(err.message);
			throw err;
		} finally {
			setLoading(false);
		}
	};

	const unpublishProduct = async (product) => {
		setLoading(true);
		setError(null);
		try {
			const response = await api.put(`/products/${product.id}`, {
				product: { ...product, published: false },
			});
			return response.data;
		} catch (err) {
			setError(err.message);
			throw err;
		} finally {
			setLoading(false);
		}
	};

	const getAdminSettings = async () => {
		setLoading(true);
		setError(null);
		try {
			const response = await api.get("/admin");
			return response.data;
		} catch (err) {
			setError(err.message);
			throw err;
		} finally {
			setLoading(false);
		}
	};

	const updateAdminSettings = async (admin) => {
		setLoading(true);
		setError(null);
		try {
			const response = await api.put("/admin", { admin });
			return response.data;
		} catch (err) {
			setError(err.message);
			throw err;
		} finally {
			setLoading(false);
		}
	};

	return {
		loading,
		error,
		getAllProducts,
		updateProduct,
		getAdminSettings,
		updateAdminSettings,
		publishProduct,
		unpublishProduct,
	};
};
