import express from "express";
import { config } from "./data/config";
import { AuthRouter } from "./routes/Auth";
import { RecipeRouter } from "./routes/Recipe";
import { UserRouter } from "./routes/User";
import cors from "cors";

const app = express();

/* Are environment variables available ? */
if (!config().port || !config().accessToken || !config().refreshToken) {
	throw new Error("Missing environment variables");
}

app.use(express.json());

app.use(
	cors({
		origin: true, // Allow requests from any origin
		credentials: true, // Allow credentials (cookies, HTTP authentication) to be included in requests
		exposedHeaders: ["Authorization"], // Expose the Authorization header to the frontend
	})
);

app.use("/auth", AuthRouter);
app.use("/recipes", RecipeRouter);
app.use("/user", UserRouter);

const server = app.listen(3001, () => {
	console.log("Server is running");
});

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
