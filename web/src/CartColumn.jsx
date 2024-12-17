import React from "react";
import { useCart } from "./hooks/useCart";
import CartItem from "./components/CartItem";
import { useAuth } from "./context/AuthContext";

const CartColumn = () => {
	const {
		cart,
		totalWithDiscount,
		checkout,
		calculateCartTotal,
		calculateDiscount,
		discountThreshold,
	} = useCart();
	const { isAuthenticated, discount_rate } = useAuth();

	const cartTotal = calculateCartTotal();
	const discount = calculateDiscount();

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
					<div className="box has-background-light">
						<div className="is-flex is-flex-direction-column is-align-items-flex-start is-justify-content-space-between">
							<p className="title is-5 mb-2">Subtotal: ${cartTotal.toFixed(2)}</p>
							{cartTotal > discountThreshold && (
								<p className="has-text-info mb-2">Discount: -${discount.toFixed(2)}</p>
							)}
							<p className="title is-4 mt-2">Total: ${totalWithDiscount.toFixed(2)}</p>
						</div>
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
