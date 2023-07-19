import { PrismaClient, Recipe } from "@prisma/client";

const prisma = new PrismaClient();

export const UserService = {
	getById: async (id: string) => {
		const user = await prisma.user.findUnique({
			where: {
				id,
			},
			include: {
				recipes: true,
			},
		});
		return user;
	},
	getByEmail: async (email: string) => {
		const user = await prisma.user.findUnique({
			where: {
				email,
			},
			include: {
				recipes: true,
			},
		});
		return user;
	},
	update: async (id: string, categories: string[], favourites: string[], recipes: Recipe[]) => {
		const user = await prisma.user.update({
			where: {
				id,
			},
			data: {
				categories: categories,
				favourites: favourites,
				recipes: {
					connect: recipes.map((recipe) => ({ id: recipe.id })),
				},
			},
			include: {
				recipes: true,
			},
		});
		return user;
	},
};
