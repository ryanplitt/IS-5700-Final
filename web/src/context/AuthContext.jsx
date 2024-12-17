import React, { createContext, useState, useContext } from "react";
import axios from "axios";

export const AuthContext = createContext();

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const API_BASE_URL = `${BACKEND_URL}`;

const api = axios.create({
	baseURL: `${API_BASE_URL}`,
	headers: {
		"Content-Type": "application/json",
	},
});

export const AuthContextProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [admin, setAdmin] = useState(null);

	const fetchAdminData = async () => {
		const response = await api.get("/admin");
		console.log(response.data);
		const { admin } = response.data;
		setAdmin(response.data.admin);
		return admin;
	};

	const login = async (email, password) => {
		setLoading(true);
		setError(null);
		setAdmin(null);
		try {
			const admin = await fetchAdminData();
			if (admin.username === email && admin.password === password) {
				setIsAuthenticated(true);
			} else {
				setError("Invalid credentials");
			}
			if (response.data.success) {
				setIsAuthenticated(true);
			} else {
				setError("Invalid credentials");
			}
		} catch (err) {
			setError("An error occurred during login");
		} finally {
			setLoading(false);
		}
	};

	const logout = () => {
		setIsAuthenticated(false);
	};

	return (
		<AuthContext.Provider
			value={{ isAuthenticated, login, logout, loading, error, admin, fetchAdminData }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(AuthContext);
};
