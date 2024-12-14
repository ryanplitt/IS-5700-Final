import React, { useEffect } from "react";

const Toast = ({ message, clearError }) => {
	useEffect(() => {
		if (message) {
			const timer = setTimeout(() => clearError(), 3000); // Auto-dismiss after 3 seconds
			return () => clearTimeout(timer);
		}
	}, [message, clearError]);

	if (!message) return null;

	return (
		<div
			className="notification is-danger is-light"
			style={{
				position: "fixed",
				bottom: "1rem",
				left: "50%",
				transform: "translateX(-50%)",
				zIndex: 1000,
			}}
		>
			{message}
		</div>
	);
};

export default Toast;
