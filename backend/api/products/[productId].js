import { promises as fs } from "fs";
import path from "path";
import applyMiddleware from "../middleware";

const handler = async (req, res) => {
	const { productId } = req.query;

	if (req.method === "PUT") {
		try {
			const product = req.body.product;

			if (!product || !product.id || !product.title || !product.description) {
				return res.status(422).json({
					message: "Invalid product data, required fields: [id, title, description]",
				});
			}

			// Resolve the absolute path to the products.json file
			const filePath = path.join(process.cwd(), "data", "products.json");
			const fileContent = await fs.readFile(filePath, "utf-8");
			const products = JSON.parse(fileContent);

			// Update the specific product
			const updatedProducts = products.map((p) =>
				String(p.id) === productId ? { ...p, ...product } : p
			);

			// Write the updated products back to the file
			await fs.writeFile(filePath, JSON.stringify(updatedProducts, null, 2));

			return res.status(200).json({ message: "Product updated!" });
		} catch (err) {
			console.error("Error updating product:", err);
			return res.status(500).json({ message: "Internal Server Error" });
		}
	}

	// Handle unsupported HTTP methods
	res.setHeader("Allow", ["PUT"]);
	return res.status(405).json({ message: "Method Not Allowed" });
};

export default applyMiddleware(handler);
