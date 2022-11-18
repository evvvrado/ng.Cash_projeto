import dayjs from "dayjs"

import { prisma } from "../prisma/client"

class GenerateRefreshToken {
	async execute(userId: string) {
		const expiresIn = dayjs().add(1, "day").unix()

		const generateRegreshToken = await prisma.refreshToken.create({
			data: {
				userId,
				expiresIn,
			},
		})

		return generateRegreshToken
	}
}

export { GenerateRefreshToken }
