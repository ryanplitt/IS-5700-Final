import React from "react";
import "./utils/stringExtensions";
import "./styles/main.scss";
import Router from "./Router";
import Layout from "./Layout";

function App() {
	return (
		<Layout>
			<Router />
		</Layout>
	);
}

export default App;
