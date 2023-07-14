import express from "express";
import { config } from "./data/config";
import { AuthRouter } from "./routes/Auth";

const app = express();

/* Are environment variables available ? */
if (!config().port || !config().accessToken || !config().refreshToken) {
	throw new Error("Missing environment variables");
}

app.use(express.json());
app.use("/auth", AuthRouter);

app.listen(3000, () => {
	console.log("Server is running");
});
