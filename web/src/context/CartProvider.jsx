import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
	const [cart, setCart] = useState([]);

	const addToCart = (product) => {
		setCart((prevCart) => {
			const existingProduct = prevCart.find((item) => item.id === product.id);
			if (existingProduct) {
				return prevCart.map((item) =>
					item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
				);
			}
			return [...prevCart, { ...product, quantity: 1 }];
		});
	};

	const updateQuantity = (productId, quantity) => {
		setCart((prevCart) =>
			prevCart.map((item) => (item.id === productId ? { ...item, quantity } : item))
		);
	};

	const removeFromCart = (productId) => {
		setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
	};

	return (
		<CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart }}>
			{children}
		</CartContext.Provider>
	);
};
