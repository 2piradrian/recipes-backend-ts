import { NextFunction, Request, Response } from "express";

export const UserValidator = {
	getById: (req: Request, res: Response, next: NextFunction) => {
		const { id } = req.params;
		if (!id) {
			return res.status(400).json({ message: "Id is required" });
		}
		next();
	},
	getByEmail: (req: Request, res: Response, next: NextFunction) => {
		const { email } = req.params;
		if (!email) {
			return res.status(400).json({ message: "Email is required" });
		}
		next();
	},
	update: (req: Request, res: Response, next: NextFunction) => {
		const { categories, favourites, recipes } = req.body;
		if (!categories) {
			return res.status(400).json({ message: "Categories is required" });
		}
		if (!favourites) {
			return res.status(400).json({ message: "Favourites is required" });
		}
		if (!recipes) {
			return res.status(400).json({ message: "Recipes is required" });
		}
		next();
	},
};
