import { promises as fs } from "fs";
import path from "path";
import applyMiddleware from "../middleware";

const handler = async (req, res) => {
	if (req.method !== "GET") {
		res.setHeader("Allow", ["GET"]);
		return res.status(405).json({ message: "Method Not Allowed" });
	}

	try {
		// Use absolute path to resolve products.json
		const filePath = path.join(process.cwd(), "data", "products.json");
		const fileContent = await fs.readFile(filePath, "utf-8");
		const productsData = JSON.parse(fileContent);

		const { groupBy, search } = req.query;

		let products = productsData;

		// Filter products by search query
		if (search) {
			products = products.filter((p) =>
				Object.values(p).some((value) => String(value).toLowerCase().includes(search.toLowerCase()))
			);
		}

		// Group products by the specified key
		if (groupBy) {
			const groupedProducts = products.reduce((acc, product) => {
				const group = product[groupBy];
				if (!acc[group]) acc[group] = [];
				acc[group].push(product);
				return acc;
			}, {});

			return res.status(200).json({ products: groupedProducts });
		}

		// Return all products if no groupBy or search is specified
		return res.status(200).json({ products });
	} catch (err) {
		console.error("Error reading products.json:", err);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

export default applyMiddleware(handler);
