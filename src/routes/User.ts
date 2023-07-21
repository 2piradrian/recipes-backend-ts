import { Router } from "express";
import { UserValidator } from "../validators/User";
import { UserController } from "../controllers/User";
import { AuthValidator } from "../../auth";

export const UserRouter = Router();

UserRouter.get("/:id", AuthValidator.checkToken, UserValidator.getById, UserController.getById);
UserRouter.get(
	"/email/:email",
	AuthValidator.checkToken,
	UserValidator.getByEmail,
	UserController.getByEmail
);
UserRouter.post("/", AuthValidator.checkToken, UserController.getByToken);
UserRouter.put("/", AuthValidator.checkToken, UserValidator.update, UserController.update);
