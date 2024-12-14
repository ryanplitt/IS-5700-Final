import React from "react";
import ProductCard from "./ProductCard";
import CartColumn from "./CartColumn";
import "./utils/stringExtensions";
import "./styles/main.scss";

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
		<div className="columns">
			{/* Products Column */}
			<div className="column is-three-quarters">
				{Object.entries(groupedProducts).map(([type, products]) => (
					<section key={type} className="section">
						<h1 className="title">{type.capitalized()}</h1>
						{/* Fixed Grid Modifiers */}
						<div className="grid has-2-cols-mobile has-2-cols-tablet has-4-cols-desktop has-4-cols-widescreen has-4-cols-fullhd">
							{products.map((product) => (
								<div key={product.id}>
									<ProductCard product={product} />
								</div>
							))}
						</div>
					</section>
				))}
			</div>

			{/* Cart Column */}
			<div className="column is-one-quarter">
				<div className="sticky-cart">
					<CartColumn />
				</div>
			</div>
		</div>
	);
};

export default ProductsPage;
