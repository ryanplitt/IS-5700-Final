import React from "react";
import { useCart } from "./hooks/useCart";

const CartColumn = () => {
	const { cart, updateQuantity, removeFromCart } = useCart();

	return (
		<aside className="box">
			<h2 className="title is-4">Your Cart</h2>
			{cart.length === 0 ? (
				<p>Your cart is empty.</p>
			) : (
				<>
					{cart.map((item) => (
						<div key={item.id} className="box">
							<p>
								<strong>{item.name}</strong>
							</p>
							<p>${item.price.toFixed(2)}</p>
							<div className="field has-addons">
								<p className="control">
									<button
										className="button is-small"
										onClick={() => updateQuantity(item.id, Math.max(item.quantity - 1, 1))}
									>
										-
									</button>
								</p>
								<p className="control">
									<input
										className="input is-small"
										type="number"
										value={item.quantity}
										onChange={(e) =>
											updateQuantity(item.id, Math.max(1, parseInt(e.target.value) || 1))
										}
									/>
								</p>
								<p className="control">
									<button
										className="button is-small"
										onClick={() => updateQuantity(item.id, item.quantity + 1)}
									>
										+
									</button>
								</p>
							</div>
							<button className="button is-danger is-small" onClick={() => removeFromCart(item.id)}>
								Remove
							</button>
						</div>
					))}
					<div className="buttons">
						<button className="button is-primary is-fullwidth">Checkout</button>
					</div>
				</>
			)}
		</aside>
	);
};

export default CartColumn;
