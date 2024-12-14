import React, { createContext, useContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
	const [cart, setCart] = useState([]);
	const [error, setError] = useState(null);

	const addToCart = (product) => {
		setCart((prevCart) => {
			const existingProduct = prevCart.find((item) => item.id === product.id);

			// Check if adding more exceeds the stock
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
					return {
						...item,
						quantity: Math.min(quantity, item.inventory), // Ensure quantity doesn't exceed inventory
					};
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

	return (
		<CartContext.Provider
			value={{
				cart,
				addToCart,
				updateQuantity,
				removeFromCart,
				calculateItemTotal,
				calculateCartTotal,
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
