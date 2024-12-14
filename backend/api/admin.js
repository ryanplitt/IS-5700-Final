import { promises as fs } from "fs";

export default async (req, res) => {
	if (req.method === "GET") {
		const fileContent = await fs.readFile("./data/admin.json");
		const admin = JSON.parse(fileContent);
		return res.status(200).json({ admin });
	}

	res.setHeader("Allow", ["GET"]);
	return res.status(405).json({ message: "Method Not Allowed" });
};
