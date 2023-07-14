import express from "express";

const app = express();

/* Are environment variables available ? */
if (!process.env.PORT || !process.env.REFRESH_TOKEN || !process.env.ACCESS_TOKEN) {
	throw new Error("Missing environment variables");
}
app.listen(3000, () => {
	console.log("Server is running");
});
