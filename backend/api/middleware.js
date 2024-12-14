// middleware.js
const cors = require("cors");

const corsMiddleware = cors({
	origin: "*", // Allow all origins (adjust as necessary)
	methods: ["GET", "PUT", "POST", "OPTIONS"], // Allowed methods
	allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
});

const applyMiddleware = (handler) => async (req, res) => {
	// Explicitly handle preflight requests
	if (req.method === "OPTIONS") {
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, OPTIONS");
		res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
		return res.status(204).end();
	}

	await corsMiddleware(req, res, () => {});
	return handler(req, res);
};

module.exports = applyMiddleware;
