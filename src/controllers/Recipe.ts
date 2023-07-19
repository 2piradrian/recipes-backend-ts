import { Request, Response } from "express";
import { RecipeService } from "../services/Recipe";

export const RecipeController = {
	getAll: async (req: Request, res: Response) => {
		try {
			const recipes = await RecipeService.getAll();
			return res.json(recipes);
		} catch (error: any) {
			return res.status(500).json({ error: error.message });
		}
	},
	getById: async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			const recipe = await RecipeService.getById(id);
			return res.json(recipe);
		} catch (error: any) {
			return res.status(500).json({ error: error.message });
		}
	},
	getPage: async (req: Request, res: Response) => {
		try {
			const { page, pageSize } = req.query;
			const recipes = await RecipeService.getPage(Number(page), Number(pageSize));
			return res.json(recipes);
		} catch (error: any) {
			return res.status(500).json({ error: error.message });
		}
	},
	getUserRecipes: async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			const recipes = await RecipeService.getUserRecipes(id);
			return res.json(recipes);
		} catch (error: any) {
			return res.status(500).json({ error: error.message });
		}
	},
	create: async (req: Request, res: Response) => {
		try {
			const { name, category, time, description, ingredients, steps, image, authorId } =
				req.body;

			const newRecipe = await RecipeService.create(
				name,
				category,
				time,
				description,
				ingredients,
				steps,
				image,
				authorId
			);
			return res.json(newRecipe);
		} catch (error: any) {
			return res.status(500).json({ error: error.message });
		}
	},
	update: async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			const { name, category, time, description, ingredients, steps, image, authorId } =
				req.body;
			const updatedRecipe = await RecipeService.update(
				id,
				name,
				category,
				time,
				description,
				ingredients,
				steps,
				image,
				authorId
			);
			return res.json(updatedRecipe);
		} catch (error: any) {
			return res.status(500).json({ error: error.message });
		}
	},
};
