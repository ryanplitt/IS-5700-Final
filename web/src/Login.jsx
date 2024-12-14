import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

const Login = () => {
	const auth = useAuth();
	const { login, loading, error, isAuthenticated } = auth || {};
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	useEffect(() => {
		if (auth.isAuthenticated) {
			navigate("/");
		}
	}, [auth.isAuthenticated]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		await login(email, password);
	};

	return (
		<section className="hero is-primary is-fullheight">
			<div className="hero-body">
				<div className="container">
					<div className="columns is-centered">
						<div className="column is-4-desktop">
							<div className="box">
								<h1 className="title has-text-centered">Login</h1>
								<form onSubmit={handleSubmit}>
									<div className="field">
										<label className="label">Email</label>
										<div className="control">
											<input
												className="input"
												type="email"
												placeholder="e.g. alex@example.com"
												value={email}
												onChange={(e) => setEmail(e.target.value)}
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
												placeholder="********"
												value={password}
												onChange={(e) => setPassword(e.target.value)}
												required
											/>
										</div>
									</div>
									<div className="field">
										<div className="control">
											<button
												className="button is-primary is-fullwidth"
												type="submit"
												disabled={loading}
											>
												{loading ? "Logging in..." : "Login"}
											</button>
										</div>
									</div>
									{error && <p className="has-text-danger">{error}</p>}
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Login;
