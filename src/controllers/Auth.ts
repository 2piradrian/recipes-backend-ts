import { Request, Response } from "express";
import { AuthService } from "../services/Auth";
import { User } from "../data/types";

export const AuthController = {
	register: async (req: Request, res: Response) => {
		try {
			const { email, password, name, image } = req.body;

			const user = await AuthService.register(email, password, name, image);

			delete (user as unknown as User).password;

			return res.json(user);
		} catch (error: any) {
			return res.status(500).json({ error: error.message });
		}
	},
	login: async (req: Request, res: Response) => {
		try {
			const { email, password } = req.body;

			const response = await AuthService.login(email, password);

			delete (response.user as unknown as User).password;

			return res.json(response);
		} catch (error: any) {
			return res.status(500).json({ error: error.message });
		}
	},
	refreshToken: async (req: Request, res: Response) => {
		try {
			const { refreshToken } = req.body;

			const tokens = await AuthService.refreshToken(refreshToken);

			return res.json(tokens);
		} catch (error: any) {
			return res.status(500).json({ error: error.message });
		}
	},
};
