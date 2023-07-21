import { Router } from "express";
import { AuthController } from "../controllers/Auth";
import { AuthValidator } from "../validators/Auth";

export const AuthRouter = Router();

AuthRouter.post("/login", AuthValidator.login, AuthController.login);
AuthRouter.post("/register", AuthValidator.register, AuthController.register);
AuthRouter.post("/refresh-token", AuthValidator.refreshToken, AuthController.refreshToken);
