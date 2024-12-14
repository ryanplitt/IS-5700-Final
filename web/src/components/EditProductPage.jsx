import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAdmin } from "../hooks/useAdmin";
import Modal from "./Modal";

const EditProductPage = () => {
	const { updateProduct } = useAdmin();
	const { productId } = useParams();
	const navigate = useNavigate();
	const { state } = useLocation();

	const [product, setProduct] = useState(
		state?.product || {
			title: "",
			description: "",
			price: "",
			image: "",
			product_type: "",
			inventory: "",
		}
	);

	const [modal, setModal] = useState({
		isActive: false,
		title: "",
		content: "",
	});

	const showModal = (title, content) => {
		setModal({ isActive: true, title, content });
	};

	const closeModal = () => {
		setModal({ isActive: false, title: "", content: "" });
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setProduct((prevProduct) => ({
			...prevProduct,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await updateProduct(productId, product);
			showModal("Success", "Product updated successfully!");
			setTimeout(() => navigate("/"), 1500);
		} catch (err) {
			console.error(err);
			showModal("Error", "Failed to update product.");
		}
	};

	return (
		<div className="container">
			<h1 className="title">Edit Product</h1>
			<form onSubmit={handleSubmit}>
				<div className="field">
					<label className="label">Title</label>
					<div className="control">
						<input
							className="input"
							type="text"
							name="title"
							value={product.title}
							onChange={handleChange}
							required
						/>
					</div>
				</div>
				<div className="field">
					<label className="label">Description</label>
					<div className="control">
						<textarea
							className="textarea"
							name="description"
							value={product.description}
							onChange={handleChange}
							required
						/>
					</div>
				</div>
				<div className="field">
					<label className="label">Price</label>
					<div className="control">
						<input
							className="input"
							type="number"
							name="price"
							value={product.price}
							onChange={handleChange}
							required
						/>
					</div>
				</div>
				<div className="field">
					<label className="label">Image URL</label>
					<div className="control">
						<input
							className="input"
							type="text"
							name="image"
							value={product.image}
							onChange={handleChange}
						/>
					</div>
				</div>
				<div className="field">
					<label className="label">Product Type</label>
					<div className="control">
						<input
							className="input"
							type="text"
							name="product_type"
							value={product.product_type}
							onChange={handleChange}
							required
						/>
					</div>
				</div>
				<div className="field">
					<label className="label">Inventory</label>
					<div className="control">
						<input
							className="input"
							type="number"
							name="inventory"
							value={product.inventory}
							onChange={handleChange}
							required
						/>
					</div>
				</div>
				<div className="field">
					<div className="control">
						<button className="button is-primary" type="submit">
							Update Product
						</button>
					</div>
				</div>
			</form>
			<Modal
				isActive={modal.isActive}
				title={modal.title}
				content={modal.content}
				onClose={closeModal}
			/>
		</div>
	);
};

export default EditProductPage;
