import { Request, Response } from "express";
import { AuthService } from "../services/Auth";

export const AuthController = {
	register: async (req: Request, res: Response) => {
		try {
			const { email, password, name } = req.body;

			const user = await AuthService.register(name, email, password);
			return res.json(user);
		} catch (error: any) {
			return res.status(500).json({ error: error.message });
		}
	},
	login: async (req: Request, res: Response) => {
		try {
			const { email, password } = req.body;

			const tokens = await AuthService.login(email, password);
			return res.json(tokens);
		} catch (error: any) {
			return res.status(500).json({ error: error.message });
		}
	},
};
