import React, { useEffect, useState } from "react";
import { useAdmin } from "../hooks/useAdmin";
import Modal from "./Modal";

const AdminPanel = () => {
	const { getAdminSettings, updateAdminSettings } = useAdmin();
	const [adminSettings, setAdminSettings] = useState({
		username: "",
		password: "",
		discount_threshold: "",
		discount_rate: "",
	});
	const [formValues, setFormValues] = useState({ ...adminSettings }); // Separate state for form inputs
	const [fetchLoading, setFetchLoading] = useState(false);
	const [updateLoading, setUpdateLoading] = useState(false);

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

	useEffect(() => {
		const fetchAdminSettings = async () => {
			setFetchLoading(true);
			try {
				const data = await getAdminSettings();
				setAdminSettings(data.admin);
				setFormValues(data.admin); // Initialize form values with fetched data
			} catch (err) {
				console.error(err);
			} finally {
				setFetchLoading(false);
			}
		};

		fetchAdminSettings();
	}, []);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormValues((prevValues) => ({
			...prevValues,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setUpdateLoading(true);
		try {
			await updateAdminSettings(formValues);
			setAdminSettings(formValues);
			showModal("Success", "Admin settings updated successfully!");
		} catch (err) {
			console.error(err);
			showModal("Error", "Failed to update admin settings.");
		} finally {
			setUpdateLoading(false);
		}
	};

	return (
		<div className="container">
			<div className="section">
				<div className="title">Admin Panel</div>
			</div>
			{fetchLoading && <p>Loading admin settings...</p>}
			<form onSubmit={handleSubmit}>
				<div className="field">
					<label className="label">Username</label>
					<div className="control">
						<input
							className="input"
							type="text"
							name="username"
							value={formValues.username}
							onChange={handleChange}
							required
						/>
					</div>
				</div>
				<div className="field">
					<label className="label">Password</label>
					<div className="control">
						<input
							className="input"
							type="password"
							name="password"
							value={formValues.password}
							onChange={handleChange}
							required
						/>
					</div>
				</div>
				<div className="field">
					<label className="label">Discount Threshold</label>
					<div className="control">
						<input
							className="input"
							type="number"
							name="discount_threshold"
							value={formValues.discount_threshold}
							onChange={handleChange}
							required
						/>
					</div>
				</div>
				<div className="field">
					<label className="label">Discount Rate</label>
					<div className="control">
						<input
							className="input"
							type="number"
							step="0.01"
							name="discount_rate"
							value={formValues.discount_rate}
							onChange={handleChange}
							required
						/>
					</div>
				</div>
				<div className="field">
					<div className="control">
						<button className="button is-primary" type="submit" disabled={updateLoading}>
							{updateLoading ? "Updating..." : "Update Settings"}
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

export default AdminPanel;
