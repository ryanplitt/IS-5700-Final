import React, { createContext, useState, useContext } from "react";
import axios from "axios";

export const AuthContext = createContext();

const API_BASE_URL = "http://localhost:3000";
const api = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

export const AuthContextProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [admin, setAdmin] = useState({
		username: "admin@example.com",
		password: "hashed_password",
		discount_threshold: 300,
		discount_rate: 0.2,
	});

	const login = async (email, password) => {
		setLoading(true);
		setError(null);
		setAdmin(null);
		try {
			const response = await api.get("/admin");
			console.log(response.data);
			const { admin } = response.data;
			if (admin.username === email && admin.password === password) {
				setIsAuthenticated(true);
				setAdmin(response.data.admin);
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
		<AuthContext.Provider value={{ isAuthenticated, login, logout, loading, error, admin }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(AuthContext);
};
