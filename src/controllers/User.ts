import { User } from "../data/types";
import { Request, Response } from "express";
import { UserService } from "../services/User";

export const UserController = {
	getById: async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			const user = await UserService.getById(id);
			if (user) {
				delete (user as unknown as User).password;
			}
			return res.json(user);
		} catch (error: any) {
			return res.status(500).json({ error: error.message });
		}
	},
	getByEmail: async (req: Request, res: Response) => {
		try {
			const { email } = req.params;
			const user = await UserService.getByEmail(email);
			if (user) {
				delete (user as unknown as User).password;
			}
			return res.json(user);
		} catch (error: any) {
			return res.status(500).json({ error: error.message });
		}
	},
	getByToken: async (req: Request, res: Response) => {
		try {
			const { userIdFromToken } = req as any;
			const user = await UserService.getById(userIdFromToken);
			if (user) {
				delete (user as unknown as User).password;
			}
			return res.json(user);
		} catch (error: any) {
			return res.status(500).json({ error: error.message });
		}
	},
	update: async (req: Request, res: Response) => {
		const { categories, favourites, recipes } = req.body;
		const { userIdFromToken } = req as any;

		try {
			const user = await UserService.update(userIdFromToken, categories, favourites, recipes);
			if (user) {
				delete (user as unknown as User).password;
			}
			return res.json(user);
		} catch (error: any) {
			return res.status(500).json({ error: error.message });
		}
	},
};
