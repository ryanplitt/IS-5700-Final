import React from "react";
import "./styles/main.scss";
import ProductCard from "./ProductCard";

const ProductsPage = ({ groupedProducts, loading, error }) => {
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
		<>
			{/* Render sections for each product type */}
			{Object.entries(groupedProducts).map(([type, products]) => (
				<section key={type} className="section">
					<div className="title">{type.capitalized()}</div>
					<div className="grid">
						{products.map((product) => (
							<ProductCard product={product} />
						))}
					</div>
				</section>
			))}
		</>
	);
};

export default ProductsPage;
