import { promises as fs } from "fs";
import path from "path";
import applyMiddleware from "../middleware";

const handler = async (req, res) => {
	if (req.method !== "GET") {
		res.setHeader("Allow", ["GET"]);
		return res.status(405).json({ message: "Method Not Allowed" });
	}

	try {
		// Use absolute path to resolve the location of products.json
		const filePath = path.join(process.cwd(), "data", "products.json");
		const fileContent = await fs.readFile(filePath, "utf-8");
		const productsData = JSON.parse(fileContent);

		// Filter for published products only
		const publishedProducts = productsData.filter((p) => p.published);

		const { groupBy, search } = req.query;

		let products = publishedProducts;

		// Filter products based on the search query
		if (search) {
			products = products.filter((p) =>
				Object.values(p).some((value) => String(value).toLowerCase().includes(search.toLowerCase()))
			);
		}

		// Group products by the specified field if groupBy is provided
		if (groupBy) {
			const groupedProducts = products.reduce((acc, product) => {
				const group = product[groupBy];
				if (!acc[group]) acc[group] = [];
				acc[group].push(product);
				return acc;
			}, {});

			return res.status(200).json({ products: groupedProducts });
		}

		// Return all filtered (and published) products
		return res.status(200).json({ products });
	} catch (error) {
		console.error("Error reading or processing products.json:", error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

export default applyMiddleware(handler);
