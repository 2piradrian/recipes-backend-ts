import { Ingredient, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const RecipeService = {
	getAll: async () => {
		const recipes = await prisma.recipe.findMany({
			include: {
				ingredients: true,
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
			},
		});
		return recipes;
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
		image: string,
		authorId: string
	) => {
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
					set: ingredients,
				},
				steps,
				image,
				authorId,
			},
		});
		return updatedRecipe;
	},
};
