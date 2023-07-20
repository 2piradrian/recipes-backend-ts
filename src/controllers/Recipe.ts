import { Request, Response } from "express";
import { RecipeService } from "../services/Recipe";
import { Recipe, RequestWithToken } from "../data/types";
import { UserService } from "../services/User";

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
	getLiked: async (req: Request, res: Response) => {
		try {
			const { userIdFromToken } = req as RequestWithToken;

			const user = await UserService.getById(userIdFromToken);

			if (!user) {
				return res.status(404).json({ error: "User not found" });
			}

			const likedRecipes: Recipe[] = [];

			// Utilizar Promise.all para esperar a que se resuelvan todas las promesas
			await Promise.all(
				user.favourites.map(async (recipe) => {
					const likedRecipe = await RecipeService.getById(recipe);
					likedRecipes.push(likedRecipe as any);
				})
			);

			return res.json({ likedRecipes });
		} catch (error: any) {
			return res.status(500).json({ error: error.message });
		}
	},
	getLatest: async (req: Request, res: Response) => {
		try {
			const latestRecipes = await RecipeService.getLatest();
			return res.json(latestRecipes);
		} catch (error: any) {
			return res.status(500).json({ error: error.message });
		}
	},
	getRecommended: async (req: Request, res: Response) => {
		const { userIdFromToken } = req as RequestWithToken;

		const user = await UserService.getById(userIdFromToken);

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		try {
			const recommendedRecipes = await RecipeService.getRecommended(user.categories);
			return res.json(recommendedRecipes);
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
			const { name, category, time, description, ingredients, steps, image } = req.body;

			const { userIdFromToken } = req as RequestWithToken;

			const user = await UserService.getById(userIdFromToken);

			if (!user) {
				return res.status(404).json({ error: "User not found" });
			}

			const recipe = await RecipeService.getById(id);

			if (!recipe) {
				return res.status(404).json({ error: "Recipe not found" });
			}

			if (recipe.authorId !== userIdFromToken) {
				return res.status(401).json({ error: "Unauthorized" });
			}

			const updatedRecipe = await RecipeService.update(
				id,
				name,
				category,
				time,
				description,
				ingredients,
				steps,
				image
			);

			return res.json(updatedRecipe);
		} catch (error: any) {
			return res.status(500).json({ error: error.message });
		}
	},
};
