import { NextFunction, Request, Response } from "express";

export const RecipeValidator = {
	create: (req: Request, res: Response, next: NextFunction) => {
		const { name, category, time, description, ingredients, steps, image, authorId } = req.body;
		if (
			!name ||
			!category ||
			!time ||
			!description ||
			!ingredients ||
			!steps ||
			!image ||
			!authorId
		) {
			return res.status(400).json({ error: "Missing fields" });
		}

		next();
	},
};
