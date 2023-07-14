import express from "express";
import { config } from "./data/config";

const app = express();

/* Are environment variables available ? */
if (!config.port || !config.accessToken || !config.refreshToken) {
	throw new Error("Missing environment variables");
}

app.listen(3000, () => {
	console.log("Server is running");
});
