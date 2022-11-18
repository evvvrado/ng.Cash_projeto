import { prisma } from "../../prisma/client"

interface iTransferBalance {
	debitedAccountId: string
	creditedUserName: string
	value: string
}

class TransferBalanceUseCase {
	async execute({ debitedAccountId, creditedUserName, value }: iTransferBalance) {
		const creditedUser = await prisma.user.findFirst({
			where: {
				username: creditedUserName,
			},
		})

		if (!creditedUser) return { erro: "Usuário inválido" }

		const debitedAccount = await prisma.account.findFirst({
			where: {
				id: debitedAccountId,
			},
		})

		if (debitedAccountId == creditedUser.accountId)
			return { erro: "Usuário inválido, você não pode transferir para si mesmo" }
		if (debitedAccount.balance < parseInt(value)) return { erro: "Saldo insuficiente" }

		const updateCreditAccount = await prisma.account.update({
			where: {
				id: creditedUser.accountId,
			},
			data: {
				balance: {
					increment: parseInt(value),
				},
			},
		})

		const updateDebitedAccount = await prisma.account.update({
			where: {
				id: debitedAccountId,
			},
			data: {
				balance: {
					decrement: parseInt(value),
				},
			},
		})

		const transaction = await prisma.transactions.create({
			data: {
				value: parseInt(value),
				debitedAccountId,
				creditedAccountId: creditedUser.accountId,
			},
		})

		return {
			message: "Transferido com sucesso!",
			transaction,
		}
	}
}

export { TransferBalanceUseCase }
