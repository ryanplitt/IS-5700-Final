import React from "react";

const Cart = ({ cart, onClose }) => {
	return (
		<div
			className="modal is-active"
			style={{ justifyContent: "flex-end", alignItems: "flex-start" }}
		>
			<div className="modal-background" onClick={onClose}></div>
			<div className="modal-content" style={{ width: "30%" }}>
				<div className="box">
					<h2 className="title is-4">Your Cart</h2>
					{cart.length === 0 ? (
						<p>Your cart is empty!</p>
					) : (
						<ul>
							{cart.map((item, index) => (
								<li key={index} className="mb-2">
									{item.name}
								</li>
							))}
						</ul>
					)}
				</div>
			</div>
		</div>
	);
};

export default Cart;
