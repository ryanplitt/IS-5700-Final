import React from "react";
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
		<>
			{/* Render sections for each product type */}
			{Object.entries(groupedProducts).map(([type, products]) => (
				<section key={type} className="section">
					<h1 className="title">{type.capitalized()}</h1>
					<div className="columns is-multiline">
						{products.map((product) => (
							<div key={product.id} className="column is-one-quarter">
								<div className="card">
									<div className="card-image">
										<figure className="image is-square">
											<img
												src={
													product.image || "https://bulma.io/assets/images/placeholders/256x256.png"
												}
												alt={product.title}
											/>
										</figure>
									</div>
									<div className="card-content">
										<p className="title is-5">{product.title}</p>
										<p className="subtitle is-6">${product.price.toFixed(2)}</p>
										<p>{product.description}</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</section>
			))}
		</>
	);
};

export default ProductsPage;
