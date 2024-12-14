import React from "react";
import { useCart } from "../hooks/useCart";
import "../styles/main.scss";

const CartItem = ({ item }) => {
	const { updateQuantity, removeFromCart, calculateItemTotal } = useCart();
	const price = Number(item.price).toFixed(2);

	return (
		<div className="box">
			<div className="media">
				{/* Image */}
				<div className="media-left">
					<figure className="image is-64x64">
						<img src={item.image || "https://via.placeholder.com/64"} alt={item.name} />
					</figure>
				</div>

				{/* Item Details */}
				<div className="media-content">
					<p className="title is-6">{item.title}</p>
					<p className="subtitle is-7">${price} each</p>

					{/* Quantity Stepper */}
					<div className="field has-addons">
						<p className="control">
							<button
								className="button is-small"
								onClick={() => updateQuantity(item.id, Math.max(item.quantity - 1, 1))}
							>
								-
							</button>
						</p>
						<p className="control is-expanded">
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

					{/* Total and Remove Button */}
					<div className="mt-3">
						<p className="subtitle is-7">Total: ${calculateItemTotal(item).toFixed(2)}</p>
						<button className="button is-danger is-small" onClick={() => removeFromCart(item.id)}>
							Remove
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CartItem;
