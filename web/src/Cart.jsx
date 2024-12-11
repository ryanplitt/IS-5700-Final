import React, { useState, useEffect, useRef } from "react";
import { useCart } from "./hooks/useCart";

const CartDropdown = () => {
	const { cart, updateQuantity, removeFromCart } = useCart();
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef();

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div className={`navbar-item has-dropdown ${isOpen ? "is-active" : ""}`} ref={dropdownRef}>
			{/* Dropdown Trigger */}
			<a className="navbar-link" onClick={() => setIsOpen(!isOpen)} style={{ cursor: "pointer" }}>
				Cart ({cart.length})
			</a>

			{/* Dropdown Menu */}
			<div className="navbar-dropdown is-right">
				{/* If the cart is empty */}
				{cart.length === 0 ? (
					<div className="navbar-item">
						<p>Your cart is empty.</p>
					</div>
				) : (
					cart.map((item) => (
						<div key={item.id} className="navbar-item">
							<div className="box" style={{ width: "100%" }}>
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
								<button
									className="button is-danger is-small"
									onClick={() => removeFromCart(item.id)}
								>
									Remove
								</button>
							</div>
						</div>
					))
				)}
				<hr className="navbar-divider" />
				<div className="navbar-item">
					<button className="button is-primary is-fullwidth">Checkout</button>
				</div>
			</div>
		</div>
	);
};

export default CartDropdown;
