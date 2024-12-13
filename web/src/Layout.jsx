import React from "react";
import Navigation from "./Navigation";
import { BrowserRouter } from "react-router-dom";

const Layout = ({ children }) => {
	return (
		<div>
			<BrowserRouter>
				<Navigation />
				<main>{children}</main>
			</BrowserRouter>
		</div>
	);
};

export default Layout;
