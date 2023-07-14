import { PrismaClient } from "@prisma/client";
import bycrypt from "bcrypt";
import { config } from "../data/config";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const AuthService = {
	register: async (email: string, password: string, name: string) => {
		const existingUser = await prisma.users.findUnique({ where: { email } });

		if (existingUser) {
			throw new Error("User already exists");
		}

		const newUser = await prisma.user.create({
			data: {
				email,
				password,
				name,
			},
		});

		return newUser;
	},
	login: async (email: string, password: string) => {
		const user = await prisma.user.findUnique({ where: { email } });

		if (!user) {
			throw new Error("User not found");
		}

		const isPasswordValid = await bycrypt.compare(password, user.password);

		if (!isPasswordValid) {
			throw new Error("Invalid password");
		}

		const accessToken = jwt.sign({ userId: user.id }, config!.accessToken, {
			expiresIn: "1h",
		});
		const refreshToken = jwt.sign({ userId: user.id }, config!.refreshToken, {
			expiresIn: "7d",
		});

		return { accessToken, refreshToken };
	},
};
