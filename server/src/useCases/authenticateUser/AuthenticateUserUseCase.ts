import { compare } from "bcryptjs"
import { prisma } from "../../prisma/client"
import { GenerateRefreshToken } from "../../provider/GenerateRefreshToken"
import { GenerateTokenProvider } from "../../provider/GenerateTokenProvider"

interface IRequest {
	username: string
	password: string
}

class AuthenticateUserUseCase {
	async execute({ username, password }) {
		const userAlreadyExists = await prisma.user.findFirst({
			where: {
				username,
			},
		})

		// if (!userAlreadyExists) throw new Error("Erro nas credenciais.")
		if (!userAlreadyExists) return { erro: "Erro nas credenciais." }

		const passwordMatch = await compare(password, userAlreadyExists.password)

		// if (!passwordMatch) throw new Error("Erro nas credenciais.")
		if (!passwordMatch) return { erro: "Erro nas credenciais." }

		const generateTokenProvider = new GenerateTokenProvider()
		const token = await generateTokenProvider.execute(userAlreadyExists.id)

		await prisma.refreshToken.deleteMany({
			where: {
				userId: userAlreadyExists.id,
			},
		})

		const generateRefreshToken = new GenerateRefreshToken()
		const refreshToken = await generateRefreshToken.execute(userAlreadyExists.id)

		return { token, refreshToken }
	}
}

export { AuthenticateUserUseCase }
