import React from "react";
import { useCart } from "./hooks/useCart";
import CartItem from "./components/CartItem";
import { useAuth } from "./context/AuthContext";

const CartColumn = () => {
	const { cart, calculateCartTotal, checkout, error, clearError } = useCart();

	const { isAuthenticated } = useAuth();

	return (
		<aside className="box">
			<h2 className="title is-4">Your Cart</h2>
			{isAuthenticated ? (
				<p>Logout to add items to the cart.</p>
			) : cart.length === 0 ? (
				<p>Your cart is empty.</p>
			) : (
				<>
					{cart.map((item) => (
						<CartItem key={item.id} item={item} />
					))}
					<hr />
					<div className="box">
						<p className="title is-5">Grand Total: ${calculateCartTotal().toFixed(2)}</p>
					</div>
					<div className="buttons">
						<button className="button is-primary is-fullwidth" onClick={checkout}>
							Checkout
						</button>
					</div>
				</>
			)}
		</aside>
	);
};

export default CartColumn;
