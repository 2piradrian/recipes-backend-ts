import express from "express";
import { config } from "./data/config";
import { AuthRouter } from "./routes/Auth";
import { RecipeRouter } from "./routes/Recipe";
import { UserRouter } from "./routes/User";

const app = express();

/* Are environment variables available ? */
if (!config().port || !config().accessToken || !config().refreshToken) {
	throw new Error("Missing environment variables");
}

app.use(express.json());

app.use("/auth", AuthRouter);
app.use("/recipes", RecipeRouter);
app.use("/user", UserRouter);

const server = app.listen(3001, () => {
	console.log("Server is running");
	console.log("DATABASE_URL: ", process.env.DATABASE_URL);
});

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
