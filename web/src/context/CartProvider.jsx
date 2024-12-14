import React, { createContext, useContext, useState } from "react";
import axios from "axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
	const [cart, setCart] = useState([]);
	const [error, setError] = useState(null);

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

	// Checkout Function
	const checkout = async () => {
		try {
			// Update inventory in the backend
			await Promise.all(
				cart.map((item) =>
					axios.put(`http://localhost:3000/products/${item.id}`, {
						product: {
							...item,
							inventory: item.inventory - item.quantity,
						},
					})
				)
			);
			// Clear the cart after successful checkout
			setCart([]);
			alert("Purchase successful! Thank you for your order.");
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
				checkout,
				error,
				clearError,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

export const useCart = () => {
	return useContext(CartContext);
};
