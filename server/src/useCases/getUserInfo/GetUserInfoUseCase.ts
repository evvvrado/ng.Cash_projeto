import { prisma } from "../../prisma/client"

interface iGetUser {
	tokenId: string
}

class GetUserInfoUseCase {
	async execute({ tokenId }: iGetUser) {
		const verifyToken = await prisma.refreshToken.findFirst({
			where: {
				id: tokenId,
			},
		})

		// return { verifyToken, tokenId }

		if (!verifyToken) return { error: "Refresh Token Inválido" }

		const userAlreadyExists = await prisma.user.findFirst({
			where: {
				id: verifyToken.userId,
			},
		})

		if (!userAlreadyExists) return { error: "Usuário Inválido" }

		const userAccount = await prisma.account.findFirst({
			where: {
				id: userAlreadyExists.accountId,
			},
		})

		return {
			username: userAlreadyExists.username,
			account: {
				id: userAccount.id,
				balance: userAccount.balance,
			},
		}
	}
}

export { GetUserInfoUseCase }
