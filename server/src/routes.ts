import { response, Router } from "express"
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated"
import { AuthenticateUserController } from "./useCases/authenticateUser/AuthenticateUserController"
import { CreateUserController } from "./useCases/createuser/CreateUserController"
import { GetTransactionsController } from "./useCases/getTransactions/GetTransactionsController"
import { GetUserInfoController } from "./useCases/getUserInfo/GetUserInfoController"
import { RefreshTokenUserController } from "./useCases/refreshTokenUser/RefreshTokenUserController"
import { TransferBalanceController } from "./useCases/transferBalance/TransferBalanceController"

const router = Router()

const createUserController = new CreateUserController()
const authenticateUserController = new AuthenticateUserController()
const refreshTokenUserController = new RefreshTokenUserController()
const getUserInfoController = new GetUserInfoController()
const getTransactionsController = new GetTransactionsController()
const transferBalanceController = new TransferBalanceController()

router.post("/register", createUserController.handle)
router.post("/login", authenticateUserController.handle)
router.post("/refresh", refreshTokenUserController.handle)

router.get("/auth", ensureAuthenticated, (req, res) => {
	return res.json({ message: "Autentificado" })
})

router.post("/user", ensureAuthenticated, getUserInfoController.handle)
router.post("/transactions", ensureAuthenticated, getTransactionsController.handle)

router.post("/transfer", ensureAuthenticated, transferBalanceController.handle)

export { router }
