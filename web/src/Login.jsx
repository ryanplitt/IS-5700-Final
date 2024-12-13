import React from "react";
import "./styles/main.scss";

const Login = () => {
	return (
		<section className="hero is-primary is-fullheight">
			<div className="hero-body">
				<div className="container">
					<div className="columns is-centered">
						<div className="column is-4-desktop">
							<div className="box">
								<h1 className="title has-text-centered">Login</h1>
								<form>
									<div className="field">
										<label className="label">Email</label>
										<div className="control">
											<input
												className="input"
												type="email"
												placeholder="e.g. alex@example.com"
												required
											/>
										</div>
									</div>
									<div className="field">
										<label className="label">Password</label>
										<div className="control">
											<input className="input" type="password" placeholder="********" required />
										</div>
									</div>
									<div className="field">
										<div className="control">
											<button className="button is-primary is-fullwidth" type="submit">
												Login
											</button>
										</div>
									</div>
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
