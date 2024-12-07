import React from "react";

const ProductCard = ({ product, addToCart, loading = false }) => {
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
				<figure className="image is-4by3">
					<img src={product.image || "https://via.placeholder.com/300"} alt={product.title} />
				</figure>
			</div>
			<div className="card-content">
				<p className="title is-4">{product.title}</p>
				<p className="subtitle is-6">${product.price.toFixed(2)}</p>
				<button className="button is-primary is-fullwidth" onClick={() => addToCart(product)}>
					Add to Cart
				</button>
			</div>
		</div>
	);
};

export default ProductCard;
