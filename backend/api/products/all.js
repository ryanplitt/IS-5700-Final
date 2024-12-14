import { promises as fs } from "fs";

export default async (req, res) => {
	if (req.method !== "GET") {
		res.setHeader("Allow", ["GET"]);
		return res.status(405).json({ message: "Method Not Allowed" });
	}

	const fileContent = await fs.readFile("./data/products.json");
	const productsData = JSON.parse(fileContent);

	const { groupBy, search } = req.query;

	let products = productsData;

	if (search) {
		products = products.filter((p) =>
			Object.values(p).some((value) => String(value).toLowerCase().includes(search.toLowerCase()))
		);
	}

	if (groupBy) {
		const groupedProducts = products.reduce((acc, product) => {
			const group = product[groupBy];
			if (!acc[group]) acc[group] = [];
			acc[group].push(product);
			return acc;
		}, {});

		return res.status(200).json({ products: groupedProducts });
	}

	return res.status(200).json({ products });
};
