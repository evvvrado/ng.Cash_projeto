import { prisma } from "../../prisma/client"

interface iGetTransactions {
	tokenId: string
}

class GetTransactionsUserCase {
	async execute({ tokenId }: iGetTransactions) {
		const transactions = []

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

		// const debitedTransactions = await prisma.transactions.findMany({
		// 	orderBy: {
		// 		createdAt: "desc",
		// 	},
		// 	where: { debitedAccountId: userAlreadyExists.accountId },
		// 	select: {
		// 		id: true,
		// 		value: true,
		// 		createdAt: true,
		// 	},
		// })

		// transactions.push(...debitedTransactions)

		const getTransactions = await prisma.transactions.findMany({
			orderBy: {
				createdAt: "desc",
			},
			where: {
				OR: [
					{ creditedAccountId: userAlreadyExists.accountId },
					{ debitedAccountId: userAlreadyExists.accountId },
				],
			},
			select: {
				id: true,
				value: true,
				createdAt: true,
				creditedAccountId: true,
				debitedAccountId: true,
			},
		})

		transactions.push(...getTransactions)

		await Promise.all(
			transactions.map(async (transaction) => {
				const isCredited = transaction.creditedAccountId == userAlreadyExists.accountId
				transaction.cashIn = isCredited

				transaction.relatedUser = await prisma.user.findFirst({
					where: {
						accountId: isCredited
							? transaction.debitedAccountId
							: transaction.creditedAccountId,
					},
					select: {
						username: true,
					},
				})

				delete transaction.creditedAccountId
				delete transaction.debitedAccountId
			})
		)

		// transactions.sort((a, b) => {
		// 	return (
		// 		Number(new Date(String(b.createdAt).replace(" ", "T"))) -
		// 		Number(new Date(String(a.createdAt).replace(" ", "T")))
		// 	)
		// })

		return {
			username: userAlreadyExists.username,
			transactions,
		}
	}
}

export { GetTransactionsUserCase }
