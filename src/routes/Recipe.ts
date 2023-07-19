import { RecipeValidator } from "../validators/Recipe";
import { RecipeController } from "./../controllers/Recipe";
import { Router } from "express";

export const RecipeRouter = Router();

RecipeRouter.get("/", RecipeController.getAll);
RecipeRouter.get("/:id", RecipeController.getById);
RecipeRouter.get("/page", RecipeController.getPage);
RecipeRouter.post("/", RecipeValidator.create, RecipeController.create);
RecipeRouter.put("/:id", RecipeController.update);
RecipeRouter.get("/user-recipes/:id", RecipeController.getUserRecipes);
