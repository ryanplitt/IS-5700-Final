import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

const ProductCard = ({ product, addToCart, loading = false }) => {
	const navigate = useNavigate();
	const { isAuthenticated } = useAuth();

	if (loading) {
		return (
			<div className="card">
				<div className="card-image">
					<figure className="image skeleton is-square"></figure>
				</div>
				<div className="card-content">
					<p className="skeleton skeleton-text is-title"></p>
					<p className="skeleton skeleton-text is-subtitle"></p>
					<button className="button is-primary is-disabled skeleton is-fullwidth">
						Add to Cart
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="card">
			<div className="card-image">
				<figure className="image is-square">
					<img src={product.image || "https://via.placeholder.com/300"} alt={product.title} />
				</figure>
			</div>
			<div className="card-content">
				<p className="title is-4">{product.title}</p>
				<p className="subtitle is-6">
					${product.price ? parseFloat(product.price).toFixed(2) : "0.00"}
				</p>
				{isAuthenticated ? (
					<button
						className="button is-warning is-fullwidth"
						onClick={() => navigate(`/edit-product/${product.id}`, { state: { product } })}
					>
						Edit Product
					</button>
				) : (
					<button className="button is-primary is-fullwidth" onClick={() => addToCart(product)}>
						Add to Cart
					</button>
				)}
			</div>
		</div>
	);
};

export default ProductCard;
