import React, { useState, useMemo } from "react";
import ProductCard from "./ProductCard";
import CartColumn from "./CartColumn";
import "./utils/stringExtensions";
import "./styles/main.scss";
import { useCart } from "./hooks/useCart";
import Toast from "./components/Toast";

const ProductsPage = ({ groupedProducts, loading, error }) => {
	const { error: cartError, clearError } = useCart();

	const [selectedTypes, setSelectedTypes] = useState([]);

	const productTypes = useMemo(() => Object.keys(groupedProducts), [groupedProducts]);

	const toggleType = (type) => {
		setSelectedTypes((prev) =>
			prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
		);
	};

	const filteredProducts = useMemo(() => {
		if (selectedTypes.length === 0) return groupedProducts;
		return Object.entries(groupedProducts).reduce((acc, [type, products]) => {
			if (selectedTypes.includes(type)) {
				acc[type] = products;
			}
			return acc;
		}, {});
	}, [groupedProducts, selectedTypes]);

	if (loading) {
		return (
			<div
				className="is-flex is-justify-content-center is-align-items-center"
				style={{ height: "100vh" }}
			>
				<div className="loader is-large"></div>
			</div>
		);
	}

	if (error) {
		return <p className="has-text-danger">{error}</p>;
	}

	return (
		<div className="columns">
			<div className="column is-three-quarters">
				<div className="tags mb-4">
					{productTypes.map((type) => (
						<span
							key={type}
							className={`tag is-large ${
								selectedTypes.includes(type) ? "is-info" : "is-light"
							} bulma-unselectable-mixin`}
							onClick={() => toggleType(type)}
							style={{ cursor: "pointer" }}
						>
							{type.capitalized()}
						</span>
					))}
				</div>

				{Object.entries(filteredProducts).map(([type, products]) => (
					<section key={type} className="section">
						<h1 className="title">{type.capitalized()}</h1>
						<div className="columns is-multiline">
							{products.map((product) => (
								<div
									key={product.id}
									className="column is-half-mobile is-half-tablet is-one-quarter-desktop"
								>
									<ProductCard product={product} />
								</div>
							))}
						</div>
					</section>
				))}
				<Toast message={cartError} clearError={clearError} />
			</div>

			<div className="column is-one-quarter">
				<div className="sticky-cart">
					<CartColumn />
				</div>
			</div>
		</div>
	);
};

export default ProductsPage;
