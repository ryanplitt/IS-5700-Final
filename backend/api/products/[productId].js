import { promises as fs } from "fs";

export default async (req, res) => {
	const { productId } = req.query;

	if (req.method === "PUT") {
		const product = req.body.product;

		if (!product || !product.id || !product.title || !product.description) {
			return res.status(422).json({
				message: "Invalid product data, required fields: [id, title, description]",
			});
		}

		const fileContent = await fs.readFile("./data/products.json");
		const products = JSON.parse(fileContent);

		const updatedProducts = products.map((p) =>
			String(p.id) === productId ? { ...p, ...product } : p
		);

		await fs.writeFile("./data/products.json", JSON.stringify(updatedProducts));

		return res.status(200).json({ message: "Product updated!" });
	}

	res.setHeader("Allow", ["PUT"]);
	return res.status(405).json({ message: "Method Not Allowed" });
};
