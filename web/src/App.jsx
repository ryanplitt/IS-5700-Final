import React from "react";
import "./utils/stringExtensions";
import "./styles/main.scss";
import Router from "./Router";
import Layout from "./Layout";
import { AuthContextProvider } from "./context/AuthContext";

function App() {
	return (
		<AuthContextProvider>
			<Layout>
				<Router />
			</Layout>
		</AuthContextProvider>
	);
}

export default App;
