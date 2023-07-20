import { AuthValidator } from "./../validators/Auth";
import { RecipeValidator } from "../validators/Recipe";
import { RecipeController } from "./../controllers/Recipe";
import { Router } from "express";

export const RecipeRouter = Router();

RecipeRouter.get("/", RecipeController.getAll);
RecipeRouter.get("/:id", RecipeController.getById);
RecipeRouter.get("/page", RecipeController.getPage);
RecipeRouter.get("/user-recipes/:id", RecipeController.getUserRecipes);
RecipeRouter.get("/home/lastest", RecipeController.getLatest);

RecipeRouter.post("/liked", AuthValidator.checkToken, RecipeController.getLiked);
RecipeRouter.post("/home/recommended", AuthValidator.checkToken, RecipeController.getRecommended);

RecipeRouter.post("/", AuthValidator.checkToken, RecipeValidator.create, RecipeController.create);
RecipeRouter.put("/:id", AuthValidator.checkToken, RecipeController.update);
