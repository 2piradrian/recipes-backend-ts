import { Ingredient, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const RecipeService = {
	getAll: async () => {
		const recipes = await prisma.recipe.findMany({
			include: {
				ingredients: true,
				author: {
					select: {
						id: true,
						email: true,
						name: true,
						image: true,
					},
				},
			},
		});
		return recipes;
	},
	getById: async (id: string) => {
		const recipe = await prisma.recipe.findUnique({
			where: {
				id,
			},
			include: {
				ingredients: true,
				author: {
					select: {
						id: true,
						email: true,
						name: true,
						image: true,
					},
				},
			},
		});
		return recipe;
	},
	getPage: async (page: number, pageSize: number) => {
		const recipes = await prisma.recipe.findMany({
			skip: (page - 1) * pageSize,
			take: pageSize,
			include: {
				ingredients: true,
				author: {
					select: {
						id: true,
						email: true,
						name: true,
						image: true,
					},
				},
			},
		});
		return recipes;
	},
	getLatest: async () => {
		const latestRecipes = await prisma.recipe.findMany({
			orderBy: [
				{
					createdAt: "desc",
				},
			],
			take: 3,
			include: {
				ingredients: true,
				author: {
					select: {
						id: true,
						email: true,
						name: true,
						image: true,
					},
				},
			},
		});

		return latestRecipes;
	},
	getRecommended: async (categories: string[]) => {
		const recommendedRecipes = await prisma.recipe.findMany({
			where: {
				category: { in: categories },
			},
			orderBy: [
				{
					createdAt: "desc",
				},
			],
			take: 3,
			include: {
				author: {
					select: {
						id: true,
						email: true,
						name: true,
						image: true,
					},
				},
			},
		});
		return recommendedRecipes;
	},
	create: async (
		name: string,
		category: string,
		time: string,
		description: string,
		ingredients: Ingredient[],
		steps: string[],
		image: string,
		authorId: string
	) => {
		const newRecipe = await prisma.recipe.create({
			data: {
				name,
				category,
				time,
				description,
				ingredients: {
					create: ingredients,
				},
				steps,
				image,
				authorId,
			},
			include: {
				ingredients: true,
				author: {
					select: {
						id: true,
						email: true,
						name: true,
						image: true,
					},
				},
			},
		});
		return newRecipe;
	},
	update: async (
		id: string,
		name: string,
		category: string,
		time: string,
		description: string,
		ingredients: Ingredient[],
		steps: string[],
		image: string
	) => {
		await prisma.ingredient.deleteMany({
			where: { recipeId: id },
		});

		const updatedRecipe = await prisma.recipe.update({
			where: {
				id,
			},
			data: {
				name,
				category,
				time,
				description,
				ingredients: {
					create: ingredients,
				},
				steps,
				image,
			},
			include: {
				ingredients: true,
				author: {
					select: {
						id: true,
						email: true,
						name: true,
						image: true,
					},
				},
			},
		});
		return updatedRecipe;
	},
	getUserRecipes: async (authorId: string) => {
		const recipes = await prisma.recipe.findMany({
			where: {
				authorId,
			},
			include: {
				ingredients: true,
				author: {
					select: {
						id: true,
						email: true,
						name: true,
						image: true,
					},
				},
			},
		});
		return recipes;
	},
};
