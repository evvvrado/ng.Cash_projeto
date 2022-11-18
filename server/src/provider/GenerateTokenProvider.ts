import { sign } from "jsonwebtoken"

class GenerateTokenProvider {
	async execute(userId: string) {
		const token = sign({}, "4f50c551-2a50-4b5c-af2c-3fdce6397d14", {
			subject: userId,
			expiresIn: "24h",
		})

		return token
	}
}

export { GenerateTokenProvider }
