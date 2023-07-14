import { PrismaClient } from "@prisma/client";

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
};
