import React from "react";
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
			{Object.entries(groupedProducts).map(([type, products]) => (
				<section key={type} className="section">
					<h1 className="title">{type.capitalized()}</h1>
					<div className="grid has-auto-count">
						{products.map((product) => (
							<div key={product.id}>
								<ProductCard product={product} />
							</div>
						))}
					</div>
				</section>
			))}
		</>
	);
};

export default ProductsPage;
