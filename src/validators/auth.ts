import { RequestWithToken } from "../data/types";
import { Response, NextFunction, Request } from "express";
import jwt from "jsonwebtoken";
import { config } from "../data/config";

export const AuthValidator = {
	checkToken: (req: Request, res: Response, next: NextFunction) => {
		const header = req.headers.authorization;

		if (!header) {
			return res.status(401).json({ message: "Authorization header not found" });
		}

		const token = header.split(" ")[1];

		if (!token) {
			return res.status(401).json({ message: "Token not found" });
		}

		try {
			const data = jwt.verify(token, config()!.accessToken);

			if (data) {
				(req as RequestWithToken).userIdFromToken = (data as any).userId;
				return next();
			}

			return res.status(401).json({ message: "Invalid token" });
		} catch (error) {
			return res.status(401).json({ message: "Invalid token" });
		}
	},
	register(req: Request, res: Response, next: NextFunction) {
		const { name, email, password, image } = req.body;

		if (!name || !email || !password || !image) {
			return res.status(400).json({ message: "All fields are required" });
		}
		if (password.length < 6) {
			return res.status(400).json({ message: "Password must be at least 6 characters" });
		}
		if (!email.includes("@") || !email.includes(".")) {
			return res.status(400).json({ message: "Invalid email" });
		}
		if (name.length < 3) {
			return res.status(400).json({ message: "Name must be at least 3 characters" });
		}
		if (image < 0 || image > 10) {
			return res.status(400).json({ message: "Invalid image" });
		}
		next();
	},
	login(req: Request, res: Response, next: NextFunction) {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({ message: "All fields are required" });
		}
		if (password.length < 6) {
			return res.status(400).json({ message: "Password must be at least 6 characters" });
		}
		if (!email.includes("@") || !email.includes(".")) {
			return res.status(400).json({ message: "Invalid email" });
		}
		next();
	},
	refreshToken(req: Request, res: Response, next: NextFunction) {
		const { refreshToken } = req.body;

		if (!refreshToken) {
			return res.status(400).json({ message: "Refresh token is required" });
		}
		next();
	},
};
