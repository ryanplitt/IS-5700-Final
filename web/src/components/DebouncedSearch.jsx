import React, { useState, useEffect } from "react";

const DebouncedSearch = ({ onSearch, delay = 500, placeholder = "Search..." }) => {
	const [inputValue, setInputValue] = useState("");

	useEffect(() => {
		const handler = setTimeout(() => {
			if (onSearch) {
				onSearch(inputValue.trim());
			}
		}, delay);

		return () => clearTimeout(handler);
	}, [inputValue]);

	const handleChange = (e) => {
		setInputValue(e.target.value);
	};

	return (
		<div className="field">
			<div className="control has-icons-left">
				<input
					className="input"
					type="text"
					placeholder={placeholder}
					value={inputValue}
					onChange={handleChange}
				/>
				<span className="icon is-left">
					<i className="fas fa-search"></i>
				</span>
			</div>
		</div>
	);
};

export default DebouncedSearch;
