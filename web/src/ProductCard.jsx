import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { useAdmin } from "./hooks/useAdmin";
import { useCart } from "./context/CartProvider";

const ProductCard = ({ product }) => {
	const { isAuthenticated } = useAuth();
	const { publishProduct, unpublishProduct } = useAdmin();
	const { addToCart } = useCart();
	const navigate = useNavigate();

	const handleTogglePublish = async () => {
		if (product.published) {
			await unpublishProduct(product);
			product.published = false;
		} else {
			await publishProduct(product);
			product.published = true;
		}
	};

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
					<>
						<button
							className="button is-warning is-fullwidth mb-2"
							onClick={() => navigate(`/edit-product/${product.id}`, { state: { product } })}
						>
							Edit Product
						</button>
						<button
							className={`button is-fullwidth ${product.published ? "is-danger" : "is-success"}`}
							onClick={handleTogglePublish}
						>
							{product.published ? "Unpublish" : "Publish"}
						</button>
					</>
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
