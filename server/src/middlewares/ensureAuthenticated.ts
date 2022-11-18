import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken"

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
	const authToken = request.headers.authorization

	if (!authToken) {
		return response.status(401).json({
			error: "Token is missing",
		})
	}

	const [, token] = authToken.split(" ")

	try {
		verify(token, "4f50c551-2a50-4b5c-af2c-3fdce6397d14")

		return next()
	} catch (err) {
		return response.status(401).json({
			error: "Token inválido",
		})
	}
}
