import { UserValidator } from "./../validators/User";
import { Router } from "express";
import { UserController } from "../controllers/User";
import { AuthValidator } from "../validators/Auth";

export const UserRouter = Router();

UserRouter.get(
	"/user/:id",
	AuthValidator.checkToken,
	UserValidator.getById,
	UserController.getById
);
UserRouter.get(
	"/user/email/:email",
	AuthValidator.checkToken,
	UserValidator.getByEmail,
	UserController.getByEmail
);
UserRouter.get("/user", AuthValidator.checkToken, UserController.getByToken);
