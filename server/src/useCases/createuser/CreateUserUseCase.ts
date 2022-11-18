import { hash } from "bcryptjs"
import { prisma } from "../../prisma/client"

interface IUserRequest {
	username: string
	password: string
}

class CreateUserUseCase {
	async execute({ username, password }: IUserRequest) {
		const userAlreadyExists = await prisma.user.findFirst({
			where: {
				username,
			},
		})

		if (userAlreadyExists) return { erro: "Usuário já existe" }
		if (username.length < 3) return { erro: "Digite um usuário mais longo" }
		if (password.length < 8) return { erro: "Digite uma senha mais longa" }

		const passwordHash = await hash(password, 8)

		const account = await prisma.account.create({
			data: {
				balance: 100,
			},
		})

		const user = await prisma.user.create({
			data: {
				username,
				accountId: account.id,
				password: passwordHash,
			},
		})

		return { user }
	}
}

export { CreateUserUseCase }
