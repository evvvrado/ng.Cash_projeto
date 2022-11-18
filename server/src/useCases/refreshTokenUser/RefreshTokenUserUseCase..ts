import { prisma } from "../../prisma/client"
import dayjs from "dayjs"
import { GenerateTokenProvider } from "../../provider/GenerateTokenProvider"
import { GenerateRefreshToken } from "../../provider/GenerateRefreshToken"

class RefreshTokenUserUseCase {
	async execute(refresh_token: string) {
		const refreshToken = await prisma.refreshToken.findFirst({
			where: {
				id: refresh_token,
			},
		})

		if (!refreshToken) {
			return { error: "Refresh Token inválido" }
		}

		const refreshTokenExpired = dayjs().isAfter(dayjs.unix(refreshToken.expiresIn))
		const generateTokenProvider = new GenerateTokenProvider()
		const token = await generateTokenProvider.execute(refreshToken.userId)

		if (refreshTokenExpired) {
			await prisma.refreshToken.deleteMany({
				where: {
					userId: refreshToken.userId,
				},
			})

			const generateRefreshTokenProvider = new GenerateRefreshToken()
			const newRefreshToken = await generateRefreshTokenProvider.execute(refreshToken.id)

			return { token, newRefreshToken }
		}

		return { token }
	}
}

export { RefreshTokenUserUseCase }
