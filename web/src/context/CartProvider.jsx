import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import Modal from "../components/Modal";

export const CartContext = createContext();

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const CartProvider = ({ children }) => {
	const [cart, setCart] = useState([]);
	const [error, setError] = useState(null);
	const [totalWithDiscount, setTotalWithDiscount] = useState(0);
	const { admin } = useAuth();

	const [modal, setModal] = useState({
		isActive: false,
		title: "",
		content: "",
	});

	const showModal = (title, content) => {
		setModal({ isActive: true, title, content });
	};

	const closeModal = () => {
		setModal({ isActive: false, title: "", content: "" });
	};

	const addToCart = (product) => {
		setCart((prevCart) => {
			const existingProduct = prevCart.find((item) => item.id === product.id);

			if (existingProduct && existingProduct.quantity >= product.inventory) {
				setError(`Only ${product.inventory} ${product.title} available in stock.`);
				return prevCart;
			}

			if (existingProduct) {
				return prevCart.map((item) =>
					item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
				);
			}

			if (product.inventory <= 0) {
				setError(`${product.title} is out of stock.`);
				return prevCart;
			}

			return [...prevCart, { ...product, quantity: 1 }];
		});
	};

	const clearError = () => {
		setError(null);
	};

	const updateQuantity = (productId, quantity) => {
		setCart((prevCart) =>
			prevCart.map((item) => {
				if (item.id === productId) {
					if (quantity > item.inventory) {
						setError(`Only ${item.inventory} ${item.title} available in stock.`);
						return item;
					}
					return { ...item, quantity };
				}
				return item;
			})
		);
	};

	const removeFromCart = (productId) => {
		setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
	};

	const calculateItemTotal = (item) => item.price * item.quantity;

	const calculateCartTotal = () =>
		cart.reduce((total, item) => total + calculateItemTotal(item), 0);

	const calculateDiscount = () => {
		if (!admin) return 0;
		const cartTotal = calculateCartTotal();
		return cartTotal > admin.discount_threshold ? cartTotal * admin.discount_rate : 0;
	};

	useEffect(() => {
		const cartTotal = calculateCartTotal();
		const discount = calculateDiscount();
		setTotalWithDiscount(cartTotal - discount);
	}, [cart, admin]);

	const discountThreshold = admin ? admin.discount_threshold : 0;

	const checkout = async () => {
		try {
			await Promise.all(
				cart.map((item) =>
					axios.put(`${BACKEND_URL}/products/${item.id}`, {
						product: {
							...item,
							inventory: item.inventory - item.quantity,
						},
					})
				)
			);
			setCart([]);
			showModal(
				"Purchase Successful",
				"Thank you for your order! Your purchase has been successfully processed."
			);
		} catch (err) {
			console.error(err);
			setError("Checkout failed. Please try again.");
		}
	};

	return (
		<CartContext.Provider
			value={{
				cart,
				addToCart,
				updateQuantity,
				removeFromCart,
				calculateItemTotal,
				calculateCartTotal,
				calculateDiscount,
				totalWithDiscount,
				checkout,
				error,
				clearError,
				discountThreshold,
			}}
		>
			{children}
			<Modal
				isActive={modal.isActive}
				title={modal.title}
				content={modal.content}
				onClose={closeModal}
			/>
		</CartContext.Provider>
	);
};

export const useCart = () => {
	return useContext(CartContext);
};
