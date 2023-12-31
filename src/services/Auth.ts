import { UserService } from "./User";
import { PrismaClient } from "@prisma/client";
import bycrypt from "bcrypt";
import { config } from "../data/config";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const AuthService = {
	register: async (email: string, password: string, name: string, image: number) => {
		const existingUser = await UserService.getByEmail(email.toLowerCase());

		if (existingUser) {
			throw new Error("User already exists");
		}

		const hashedPassword = await bycrypt.hash(password, 10);

		const newUser = await prisma.user.create({
			data: {
				email: email.toLowerCase(),
				password: hashedPassword,
				name: name,
				image: image,
			},
			include: {
				recipes: true,
			},
		});

		return newUser;
	},
	login: async (email: string, password: string) => {
		const user = await UserService.getByEmail(email.toLowerCase());
		if (!user) {
			throw new Error("User not found");
		}

		const isPasswordValid = await bycrypt.compare(password, user.password);

		if (!isPasswordValid) {
			throw new Error("Invalid password");
		}

		const accessToken = jwt.sign({ userId: user.id }, config()!.accessToken, {
			expiresIn: "1h",
		});
		const refreshToken = jwt.sign({ userId: user.id }, config()!.refreshToken, {
			expiresIn: "7d",
		});

		return { user, tokens: { accessToken, refreshToken } };
	},
	refreshToken: async (refreshToken: string) => {
		const { userId } = jwt.verify(refreshToken, config()!.refreshToken) as any;

		const user = await prisma.user.findUnique({ where: { id: userId } });

		if (!user) {
			throw new Error("User not found");
		}

		const accessToken = jwt.sign({ userId: user.id }, config()!.accessToken, {
			expiresIn: "1h",
		});
		const newRefreshToken = jwt.sign({ userId: user.id }, config()!.refreshToken, {
			expiresIn: "7d",
		});
		return { accessToken, refreshToken: newRefreshToken };
	},
};
