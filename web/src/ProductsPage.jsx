import React, { useEffect, useState } from "react";
import { useAPI } from "./hooks/useAPI"; // Adjust the path
import ProductCard from "./ProductCard";

const ProductsPage = ({ addToCart }) => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const { fetchPublishedProducts } = useAPI();

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const products = await fetchPublishedProducts();
				setProducts(products);
			} catch (err) {
				setError("Failed to load products");
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, [fetchPublishedProducts]);

	if (loading) {
		return <p>Loading products...</p>;
	}

	if (error) {
		return <p className="has-text-danger">{error}</p>;
	}

	return (
		<section className="section">
			<div className="container">
				<div className="grid is-col-min-8">
					{products.map((product) => (
						<div className="cell" key={product.id}>
							<ProductCard product={product} addToCart={addToCart} />
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default ProductsPage;
