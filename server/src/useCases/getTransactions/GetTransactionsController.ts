import { Request, Response } from "express"
import { GetTransactionsUserCase } from "./getTransactionsUserCase"

class GetTransactionsController {
	async handle(request: Request, response: Response) {
		const { tokenId } = request.body

		const getTransactionsUserCase = new GetTransactionsUserCase()

		const transactions = await getTransactionsUserCase.execute({
			tokenId,
		})
		return response.json(transactions)
	}
}

export { GetTransactionsController }
