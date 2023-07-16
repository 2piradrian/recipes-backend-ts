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
};
