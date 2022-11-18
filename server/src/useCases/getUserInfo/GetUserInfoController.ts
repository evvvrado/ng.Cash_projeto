import { Request, Response } from "express"
import { GetUserInfoUseCase } from "./GetUserInfoUseCase"

class GetUserInfoController {
	async handle(request: Request, response: Response) {
		const { tokenId } = request.body
		// const authToken = request.headers.authorization

		const getUserInfoUseCase = new GetUserInfoUseCase()

		const token = await getUserInfoUseCase.execute({
			tokenId,
		})
		return response.json(token)
	}
}

export { GetUserInfoController }
