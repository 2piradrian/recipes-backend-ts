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

/* middleware */
app.use(express.json());

/* frontend in port 3000 */
app.use(cors({ origin: "http://localhost:3000" }));

app.use("/auth", AuthRouter);
app.use("/recipes", RecipeRouter);
app.use("/user", UserRouter);

/* backend in port 3333 */
app.listen(3333, () => {
	console.log("Server is running");
});
