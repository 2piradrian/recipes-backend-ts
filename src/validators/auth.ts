import { RequestWithToken } from "./../data/types";
import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const accessTokenSecret = process.env.access_token_secret ?? "";

export const AuthValidator = {
	checkToken: (req: RequestWithToken, res: Response, next: NextFunction) => {
		const header = req.headers["authorization"];

		if (!header) {
			return res.status(401).json({ message: "Authorization header not found" });
		}

		const token = header.split(" ")[1];

		if (!token) {
			return res.status(401).json({ message: "Token not found" });
		}

		try {
			const data = jwt.verify(token, accessTokenSecret);

			if (data) {
				req.userIdFromToken = (data as any).userId;
				return next();
			}

			return res.status(401).json({ message: "Invalid token" });
		} catch (error) {
			return res.status(401).json({ message: "Invalid token" });
		}
	},
};
