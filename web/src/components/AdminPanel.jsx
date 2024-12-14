import React, { useEffect, useState } from "react";
import { useAdmin } from "../hooks/useAdmin";

const AdminPanel = () => {
	const { loading, error, getAdminSettings, updateAdminSettings } = useAdmin();
	const [adminSettings, setAdminSettings] = useState({
		username: "",
		password: "",
		discount_threshold: "",
		discount_rate: "",
	});

	useEffect(() => {
		const fetchAdminSettings = async () => {
			try {
				const data = await getAdminSettings();
				setAdminSettings(data.admin);
			} catch (err) {
				console.error(err);
			}
		};

		fetchAdminSettings();
	}, [getAdminSettings]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setAdminSettings((prevSettings) => ({
			...prevSettings,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await updateAdminSettings(adminSettings);
			alert("Admin settings updated successfully!");
		} catch (err) {
			console.error(err);
			alert("Failed to update admin settings.");
		}
	};

	return (
		<div className="container">
			<div className="section">
				<div className="title">Admin Panel</div>
			</div>
			{loading && <p>Loading...</p>}
			{error && <p className="has-text-danger">{error}</p>}
			<form onSubmit={handleSubmit}>
				<div className="field">
					<label className="label">Username</label>
					<div className="control">
						<input
							className="input"
							type="text"
							name="username"
							value={adminSettings.username}
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
							value={adminSettings.password}
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
							value={adminSettings.discount_threshold}
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
							value={adminSettings.discount_rate}
							onChange={handleChange}
							required
						/>
					</div>
				</div>
				<div className="field">
					<div className="control">
						<button className="button is-primary" type="submit" disabled={loading}>
							{loading ? "Updating..." : "Update Settings"}
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default AdminPanel;
