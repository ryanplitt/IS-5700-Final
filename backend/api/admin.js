import { promises as fs } from "fs";
import path from "path";

export default async (req, res) => {
	try {
		if (req.method === "GET") {
			// Use absolute path for the admin.json file
			const filePath = path.join(process.cwd(), "data", "admin.json");
			const fileContent = await fs.readFile(filePath, "utf-8");
			const admin = JSON.parse(fileContent);

			return res.status(200).json({ admin });
		}

		// Handle unsupported methods
		res.setHeader("Allow", ["GET"]);
		return res.status(405).json({ message: "Method Not Allowed" });
	} catch (error) {
		console.error("Error reading or processing admin.json:", error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};
