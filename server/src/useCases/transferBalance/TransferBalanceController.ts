import { Request, Response } from "express"
import { TransferBalanceUseCase } from "./TransferBalanceUseCase"

class TransferBalanceController {
	async handle(request: Request, response: Response) {
		const { debitedAccountId, creditedUserName, value } = request.body

		const transferBalanceUseCase = new TransferBalanceUseCase()

		const transaction = await transferBalanceUseCase.execute({
			debitedAccountId,
			creditedUserName,
			value,
		})

		return response.json(transaction)
	}
}

export { TransferBalanceController }
